import React, {Component} from "react";
import {Routes, Route, Link, BrowserRouter as Router} from "react-router-dom";

import Cart from './components/ShoppingCart';
import Login from './components/Login';

import Products from './components/Products';
import {getProducts, validateUser} from "./utils/Resources";

import Context from "./Context";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            cart: {},
            products: []
        };
        this.routerRef = React.createRef();
    }

    componentDidMount__() {
        let user = localStorage.getItem("user");
        user = user ? JSON.parse(user) : null;
        this.setState({user});
    }

    componentDidMount() {
        try {

            let user = localStorage.getItem("user");
            let cart = localStorage.getItem("cart");

            const products = getProducts();
            user = user ? JSON.parse(user) : null;
            cart = cart ? JSON.parse(cart) : {};
            this.setState({user, products: products, cart});
        } catch (error) {
            console.log('Error', error);
        }
    }

    addToCart = cartItem => {
        let cart = this.state.cart;
        if (cart[cartItem.id]) {
            cart[cartItem.id].amount += cartItem.amount;
        } else {
            cart[cartItem.id] = cartItem;
        }
        if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
            cart[cartItem.id].amount = cart[cartItem.id].product.stock;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };

    removeFromCart = cartItemId => {
        let cart = this.state.cart;
        delete cart[cartItemId];
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };

    clearCart = () => {
        let cart = {};
        localStorage.removeItem("cart");
        this.setState({cart});
    };

    checkout = () => {
        if (!this.state.user) {
            this.routerRef.current.history.push("/login");
            return;
        }

        const cart = this.state.cart;

        const products = this.state.products.map(p => {
            if (cart[p.name]) {
                p.stock = p.stock - cart[p.name].amount;
            }
            return p;
        });
        this.setState({products});
        this.clearCart();

        console.log("Betalningen ok");
    };

    login = async (email, password) => {
        const userIsValid = validateUser(email, password);

        if (userIsValid) {
            const user = {
                email,
                accessLevel: email === 'admin@example.com' ? 0 : 1
            }

            this.setState({user});
            localStorage.setItem("user", JSON.stringify(user));
            return true;
        } else {
            return false;
        }
    }

    logout = e => {
        e.preventDefault();
        this.setState({user: null});
        localStorage.removeItem("user");
    };

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    removeFromCart: this.removeFromCart,
                    addToCart: this.addToCart,
                    clearCart: this.clearCart,
                    checkout: this.checkout,
                    login: this.login
                }}
            >
                <Router ref={this.routerRef}>
                    <div className="App">
                        <nav
                            className="navbar container"
                            role="navigation"
                            aria-label="main navigation"
                        >
                            <div className="navbar-brand">
                                <b className="navbar-item is-size-4 ">Webshop</b>

                            </div>
                            <div className={`navbar-menu ${
                                this.state.showMenu ? "is-active" : ""
                            }`}>
                                <Link to="/produkter" className="navbar-item">
                                    Produkter
                                </Link>
                                <Link to="/varukorg" className="navbar-item">
                                    Varukorgen
                                    <span
                                        className="tag is-primary"
                                        style={{marginLeft: "5px"}}
                                    >
                    {Object.keys(this.state.cart).length}
                  </span>
                                </Link>
                                {!this.state.user ? (
                                    <Link to="/login" className="navbar-item">
                                        Logga in
                                    </Link>
                                ) : (
                                    <Link to="/" onClick={this.logout} className="navbar-item">
                                        Logga ut
                                    </Link>
                                )}
                            </div>
                        </nav>
                        <Routes>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route exact path="/varukorg" element={<Cart/>}></Route>
                            <Route exact path="/produkter" element={<Products/>}></Route>
                        </Routes>
                    </div>
                </Router>
            </Context.Provider>
        );
    }

}
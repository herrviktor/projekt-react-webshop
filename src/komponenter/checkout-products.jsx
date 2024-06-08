const CheckoutProducts = ({ children }) => {
    return (
        <section className="checkout-products">
            <h3 id="shopping-title">Du ska beställa följande:</h3>
            <ul id="shopping-list">{children}</ul>
            <span id="shopping-total"></span>
        </section>
    )
}

export default CheckoutProducts
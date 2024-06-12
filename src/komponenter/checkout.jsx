import './checkout.css';
const Checkout = ({ children }) => {
    return (
        <>
            <section className="checkout-products checkout-section">
                <h3 id="shopping-title">Du ska beställa följande:</h3>
                <ul id="shopping-list">{children}</ul>
                <span id="shopping-total"></span>
            </section>
            <section class="payment checkout-section">
                <h3>För beställning var vänlig fyll i dina uppgifter nedan:</h3>
                <form id="checkout-form">
                    <div>
                        <label for="fname">Förnamn:</label>
                        <input class="input" type="text" id="fname" name="fname" placeholder="Förnamn" pattern="[a-zA-Z]+" />
                    </div>
                    <div>
                        <label for="lname">Efternamn:</label>
                        <input class="input" type="text" id="lname" name="lname" placeholder="Efternamn" pattern="[a-zA-Z]+" />
                    </div>
                    <div>
                        <label for="address">Adress:</label>
                        <input type="address" id="address" name="address" placeholder="Adress" pattern="[a-zA-ZåäöÅÄÖ]+\s\d{1,3}" />
                    </div>
                    <div>
                        <label for="city">Stad:</label>
                        <input type="text" id="city" name="city" placeholder="Stad" pattern="[a-zA-Z]+" />
                    </div>
                    <div>
                        <label for="zip">Postnummer:</label>
                        <input type="zip" id="zip" name="zip" placeholder="12345" pattern="\d{5}(?:[-\s]\d{4})?" />
                    </div>
                    <div>
                        <label for="country">Land:</label>
                        <select id="country" name="country">
                            <option value="sweden">Sverige</option>
                            <option value="norway">Norge</option>
                            <option value="denmark">Danmark</option>
                            <option value="finland">Finland</option>
                        </select>
                    </div>
                    <div>
                        <label for="phone">Telefonnummer:</label>
                        <input type="tel" id="phone" name="phone" placeholder="073-007 007 08" pattern="\d{3}-\d{3} \d{2} \d{2}" />
                    </div>
                    <div>
                        <label for="EMail">E-post:</label>
                        <input type="email" id="EMail" name="EMail" placeholder="E-post" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                    </div>
                </form>
                <div>
                    <button>Beställ</button>
                </div>
            </section>
        </>
    )
}

export default Checkout
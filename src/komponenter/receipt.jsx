import { Link } from 'react-router-dom';
import './receipt.css';



const Receipt = () => {

    return (
        <div className="receipt main-flex">
            <p className="receipt-text text-color">
                Order made. A receipt has been sent to your email. 
                Thank you for shopping with us. Hope you will be satisfied
                with your purchase. If you have any questions or need help 
                with your order, feel free to call or email us and we will
                happily assist you the best way possible.
            </p>
            <Link to='/projekt-react-webshop'>
                <button className='button receipt-button main-button'>Back top shopping</button>
            </Link>
        </div>
    )
}

    

export default Receipt;
import { useContext} from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';



const Receipt = () => {

    const { deleteCart } = useContext(ProductContext);


    return (
        <div>
            <p id="receipt-text">
                Order made. A receipt has been sent to your email. 
                Thank you for shopping with us. Hope you will be satisfied
                with your purchase. If you have any questions or need help 
                with your order, feel free to call or email us and we will
                happily assist you the best way possible.
            </p>
            <Link to='/projekt-react-webshop'>
                <button onClick={() => deleteCart()} className='button receipt-button'>Back top shopping</button>
            </Link>
        </div>
    )
}

    

export default Receipt;
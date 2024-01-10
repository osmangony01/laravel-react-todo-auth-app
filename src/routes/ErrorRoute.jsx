
import { Link } from 'react-router-dom';


const ErrorRoute = () => {
    
    return (
        <section className='mt-48 w-[400px] mx-auto'>
            <div className='text-center w-full'>
                <img className='mx-auto h-[100px] w-[100px]' src="/public/error-icon.svg" alt="" />
                <h2 className='text-3xl text-red-700 font-bold pt-1'>
                    <span>404 not found</span> 
                </h2>
                <p>
                    <button className='py-3 px-6 border-0 bg-slate-100 hover:bg-slate-300 rounded-md'>
                        <Link to='/' className=''>
                            Back to homepage
                        </Link>
                    </button>
                </p>
            </div>
        </section>
    );
};

export default ErrorRoute;
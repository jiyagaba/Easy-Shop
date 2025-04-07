import React, { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm text-white font-medium hover:bg-[#2a2a40] hover:shadow-[0_0_10px_#9b5cfb] cursor-pointer transition-all duration-200 px-2 rounded-md'>
                <div className='w-[20%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>$3434</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <span className='py-[2px] px-[8px] bg-yellow-400 text-black rounded-md text-xs font-semibold'>Pending</span>
                </div>
                <div className='w-[20%] p-2 whitespace-nowrap'>25 Dec 2023</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <button className='bg-indigo-600 hover:bg-indigo-700 px-3 py-[4px] rounded-md text-white text-xs shadow-md hover:shadow-indigo-500/50 transition'>
                        Confirm
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3 text-white'>Withdrawal Requests</h1>

            <div className='w-full p-4 bg-[#1e1e2f] rounded-md shadow-[0_0_15px_#9b5cfb]'>
                <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#a7a3de] text-[#1e1e2f] uppercase text-xs font-bold min-w-[500px] rounded-md'>
                        <div className='w-[20%] p-2'> No </div>
                        <div className='w-[20%] p-2'> Amount </div>
                        <div className='w-[20%] p-2'> Status </div>
                        <div className='w-[20%] p-2'> Date </div>
                        <div className='w-[20%] p-2'> Action </div>
                    </div>

                    <List
                        style={{ minWidth: '500px' }}
                        className='List'
                        height={350}
                        itemCount={100}
                        itemSize={45}
                        outerElementType={outerElementType}
                    >
                        {Row}
                    </List>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;

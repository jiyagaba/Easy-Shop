import React, { forwardRef } from 'react';
import { MdCurrencyExchange } from "react-icons/md";
import { FixedSizeList as List } from 'react-window';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const Row = ({ index, style }) => (
    <div style={style} className='flex text-sm text-white font-medium'>
      <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[25%] p-2 whitespace-nowrap'>$3434</div>
      <div className='w-[25%] p-2 whitespace-nowrap'>
        <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>Pending</span>
      </div>
      <div className='w-[25%] p-2 whitespace-nowrap'>25 Dec 2023</div>
    </div>
  );

  const cardStyles = `p-4 rounded-xl shadow-[0_0_15px_#b183f2] flex justify-between items-center text-white border border-[#b183f2] transition-all duration-300 bg-[#1f0e4f]`;

  const labelColor = 'text-[#d4c7ff]';

  return (
    <div className='px-2 md:px-7 py-5 bg-[#0f0a2b] min-h-screen'>
      {/* Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {[
          { value: '$3434', label: 'Total Sales' },
          { value: '$150', label: 'Available Amount' },
          { value: '$100', label: 'Withdrawal Amount' },
          { value: '$0', label: 'Pending Amount' },
        ].map((item, idx) => (
          <div key={idx} className={cardStyles}>
            <div>
              <h2 className='text-xl font-bold'>{item.value}</h2>
              <span className={`text-sm ${labelColor}`}>{item.label}</span>
            </div>
            <div className='w-[40px] h-[47px] rounded-full bg-[#b183f2] flex justify-center items-center text-xl'>
              <MdCurrencyExchange className='text-[#0f0a2b]' />
            </div>
          </div>
        ))}
      </div>

      {/* Request & History Sections */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Send Request */}
        <div className='bg-[#1f0e4f] text-white rounded-xl p-5 shadow-[0_0_15px_#b183f2]'>
          <h2 className='text-lg font-bold mb-3'>Send Request</h2>
          <form className='flex flex-wrap gap-3 mb-6'>
            <input
              min='0'
              type="number"
              name='amount'
              placeholder='Enter amount'
              className='px-3 py-2 flex-grow min-w-[60%] focus:border-[#b183f2] outline-none bg-[#0f0a2b] border border-slate-700 rounded-md text-white'
            />
            <button className='bg-[#b183f2] hover:bg-[#c29efc] text-white rounded-md px-7 py-2'>
              Submit
            </button>
          </form>

          <h2 className='text-lg font-bold mb-3'>Pending Request</h2>
          <div className='w-full overflow-x-auto'>
            <div className='flex bg-[#3b2d7a] uppercase text-xs font-bold min-w-[340px] rounded-md'>
              <div className='w-[25%] p-2'>No</div>
              <div className='w-[25%] p-2'>Amount</div>
              <div className='w-[25%] p-2'>Status</div>
              <div className='w-[25%] p-2'>Date</div>
            </div>
            <List
              style={{ minWidth: '340px' }}
              className='List'
              height={350}
              itemCount={10}
              itemSize={35}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          </div>
        </div>

        {/* Success Withdrawal */}
        <div className='bg-[#1f0e4f] text-white rounded-xl p-5 shadow-[0_0_15px_#b183f2]'>
          <h2 className='text-lg font-bold mb-3'>Success Withdrawal</h2>
          <div className='w-full overflow-x-auto'>
            <div className='flex bg-[#3b2d7a] uppercase text-xs font-bold min-w-[340px] rounded-md'>
              <div className='w-[25%] p-2'>No</div>
              <div className='w-[25%] p-2'>Amount</div>
              <div className='w-[25%] p-2'>Status</div>
              <div className='w-[25%] p-2'>Date</div>
            </div>
            <List
              style={{ minWidth: '340px' }}
              className='List'
              height={350}
              itemCount={10}
              itemSize={35}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;

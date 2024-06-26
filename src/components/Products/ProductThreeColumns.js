import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductItem from './ProductItem';

function ProductThreeColumns({
    products,
    productFilter,
    productFilterPath,
}) {
    const { filterData } = useSelector((state) => state.filter);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(9);

    const [pageNumberLimit, setPageNumberLimit] = useState(9);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(9);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const filteredProduct = products.filter((singleProduct) => {
        const filterGroupResult = {};

        filterData.forEach((singleFilterData) => {
            if (singleFilterData.key === 'priceFilter') {
                filterGroupResult[singleFilterData.group] =
                    singleFilterData.data.fromPrice <= singleProduct.price &&
                    singleProduct.price <= singleFilterData.data.toPrice;
            } else if (!filterGroupResult[singleFilterData.group]) {
                filterGroupResult[singleFilterData.group] =
                    singleProduct[singleFilterData.group] ===
                    singleFilterData.key;
            }
        });

        return !Object.values(filterGroupResult).includes(false);
    });

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredProduct.length / itemPerPage); i++) {
        pages.push(i);
    }

    const indexofLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexofLastItem - itemPerPage;
    const currentItems = filteredProduct.slice(
        indexOfFirstItem,
        indexofLastItem
    );

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li className="px-[5px]" key={number}>
                    <span
                        className={`${currentPage === number ? 'active text-white' : 'text-black'
                            } bg-[#f5f5f5] cursor-pointer flex items-center px-[13px] h-[34px] text-[12px] font-medium`}
                        id={number}
                        onClick={handleClick}
                    >
                        {number}
                    </span>
                </li>
            );
        }
        return null;
    });

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % maxPageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>;
    }

    return (
        <div className="product border-b border-[#ededed] pb-[40px]">
            <div className="container">
                <div className="grid grid-cols-12 lg:gap-x-[25px]">
                    <div className="col-span-12">
                        <div>
                            <div className="grid md:grid-cols-3 lm:grid-cols-2 grid-cols-1 lm:gap-x-[25px] gap-y-[40px] ">
                                {currentItems &&
                                    currentItems.map((product) => (
                                        <ProductItem
                                            product={product}
                                            productFilter={productFilter}
                                            productFilterPath={
                                                productFilterPath
                                            }
                                            key={product.id}
                                        />
                                    ))}
                            </div>
                        </div>
                        <ul className="pagination flex justify-center pt-[40px]">
                            <li className="px-[5px]">
                                <button
                                    className={`${currentPage === pages[0] ? 'hidden' : ''
                                        } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
                                    type="button"
                                    onClick={handlePrevbtn}
                                    disabled={currentPage === pages[0]}
                                >
                                    Prev
                                </button>
                            </li>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            <li className="px-[5px]">
                                <button
                                    className={`${currentPage === pages[pages.length - 1]
                                        ? 'hidden'
                                        : ''
                                        } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
                                    type="button"
                                    onClick={handleNextbtn}
                                    disabled={
                                        currentPage === pages[pages.length - 1]
                                    }
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductThreeColumns.propTypes = {
    products: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    productFilterPath: PropTypes.string.isRequired,
    gridTabItems: PropTypes.instanceOf(Object).isRequired,
};

export default ProductThreeColumns;

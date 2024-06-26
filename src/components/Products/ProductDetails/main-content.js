import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoAddSharp, IoRemoveSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart/cart-slice';

// Tailwind Related Stuff
const soldOut = `bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]`;
const bestSeller = `bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const productOffer = `bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const qtybutton = `cursor-pointer text-center absolute w-[24px] leading-[23px]`;
const qtyButtonWrap = `relative inline-flex border border-[#dddddd]`;
const addtoCartBtn = `bg-black text-white px-[42px] h-[46px] leading-[44px]`;

function MainContent({ product }) {
    const {
        id,
        title,
        price,
        size,
        color,
        discountPrice,
        totalPrice,
        soldOutSticker,
        bestSellerSticker,
        offerSticker,
    } = product;
    const [quantityCount, setQuantityCount] = useState(1);

    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
                size,
                color,
                quantity: quantityCount,
                totalPrice,
                image: `/images/products/${product?.slug}/${product?.xsImage}`,
                slug: `/shop/${product?.slug}`,
            })
        );
    };

    return (
        <div className="product-detail pb-[40px]">
            <div className="container">
                <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[25px]">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="product-detail-img relative">
                            {soldOutSticker && (
                                <span
                                    className={`${soldOutSticker ? `${soldOut}` : ''
                                        }`}
                                >
                                    {soldOutSticker}
                                </span>
                            )}
                            {bestSellerSticker && (
                                <span
                                    className={`${bestSellerSticker ? `${bestSeller}` : ''
                                        }`}
                                >
                                    {bestSellerSticker}
                                </span>
                            )}
                            {offerSticker && (
                                <span
                                    className={`${offerSticker ? `${productOffer}` : ''
                                        }`}
                                >
                                    {offerSticker}
                                </span>
                            )}
                            <img
                                className="w-full"
                                src={`/images/products/${product?.slug}/${product?.mdImage}`}
                                alt={product?.altImage}
                                width={585}
                                height={585}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="product-detail-content">
                            <h3 className="mb-[10px] text-primary">{product?.title}</h3>
                            {price && !discountPrice && (
                                <span className="product-price text-[30px] leading-[42px] text-[#999999] mb-[25px]">
                                    £{price.toFixed(2)}
                                </span>
                            )}
                            {price && discountPrice && (
                                <div className="product-price-wrap flex mb-[10px]">
                                    <span className="product-price text-[30px] leading-[42px] text-[#999999] block">
                                        £{price.toFixed(2)}
                                    </span>
                                    <span className="product-price text-[30px] leading-[42px] text-[#999999] block relative before:content-['-'] before:mx-[10px]">
                                        £{discountPrice.toFixed(2)}
                                    </span>
                                </div>
                            )}

                            <p className="text-[14px] leading-[24px] lg:max-w-[450px]">
                                {product?.desc}
                            </p>
                            <div
                                className='flex flex-col mb-[5px]'
                            >
                                <label
                                    htmlFor="billing-companyname"
                                    className="text-black font-medium mb-[5px]"
                                >
                                    Size
                                </label>
                                <select
                                    className='border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]'
                                >
                                    <option>{product?.size}</option>
                                </select>
                            </div>
                            <div
                                className='flex flex-col mb-[5px]'
                            >
                                <label
                                    htmlFor="billing-companyname"
                                    className="text-black font-medium mb-[5px]"
                                >
                                    Colour
                                </label>
                                <select
                                    className='border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]'
                                >
                                    <option>{product?.color}</option>
                                </select>
                            </div>
                            <div className="group-btn flex py-[30px]">
                                <div className={`${qtyButtonWrap} mr-[15px]`}>
                                    <div className="flex justify-center w-[120px]">
                                        <button
                                            role="button"
                                            type="button"
                                            className={`${qtybutton} dec top-1/2 -translate-y-1/2 left-[4px]`}
                                            onClick={() =>
                                                setQuantityCount(
                                                    quantityCount > 1
                                                        ? quantityCount - 1
                                                        : 1
                                                )
                                            }
                                        >
                                            <IoRemoveSharp />
                                        </button>
                                        <input
                                            className="qty-input outline-none text-center w-[100px] px-[15px] h-[46px] leading-[40px]"
                                            type="text"
                                            name="qtybutton"
                                            value={quantityCount}
                                            onChange={(e) => {
                                                const userInput = Number(
                                                    e.target.value
                                                );
                                                if (
                                                    userInput.toString() !==
                                                    'NaN'
                                                ) {
                                                    setQuantityCount(userInput);
                                                }
                                            }}
                                        />
                                        <button
                                            role="button"
                                            type="button"
                                            className={`${qtybutton} inc top-1/2 -translate-y-1/2 right-[4px]`}
                                            onClick={() =>
                                                setQuantityCount(
                                                    quantityCount >= 0
                                                        ? quantityCount + 1
                                                        : quantityCount
                                                )
                                            }
                                        >
                                            <IoAddSharp />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`${soldOutSticker
                                            ? `cursor-not-allowed`
                                            : ''
                                        }`}
                                >
                                    <button
                                        role="button"
                                        type="button"
                                        className={`${addtoCartBtn} ${soldOutSticker
                                                ? `pointer-events-none`
                                                : 'hover:bg-[#666666]'
                                            } mr-[15px]`}
                                        onClick={addToCartHandler}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <div className="other-info">
                                <div className="sku-wrap font-medium">
                                    <span>SKU:</span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {product?.sku}
                                    </span>
                                </div>
                                <div className="category-wrap font-medium">
                                    <span>Categories:</span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {product?.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

MainContent.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
};

export default MainContent;

import {
  Box,
  Button, ButtonGroup,
  Card,
  CardContent,
  CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  Skeleton, TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import {Link, useNavigate} from 'react-router-dom';
import noImage from '../../pages/productList/images/noimage.jpg';
import useCartOrderStore from "../../store/useCartOrderStore";

const baseURL = process.env.REACT_APP_API_BASE_URL;

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(noImage); // 기본 이미지로 초기화
  const { addCart, addOrder } = useCartOrderStore((state) => state);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [isSoldOut, setIsSoldOut] = useState(product.stockQuantity === 0);

  useEffect(() => {
    setIsLoading(true);

    if (product.pictureUrl) {
      const fullImageUrl = `${baseURL}/api/images/${product.pictureUrl}`; // Construct full URL
      const img = new Image();
      img.src = fullImageUrl;
      img.onload = () => {
        setIsLoading(false);
        setImageUrl(img.src); // 이미지 로딩 성공 시 URL 업데이트
      };
      img.onerror = () => {
        setIsLoading(false);
        setImageUrl(noImage); // 로딩 실패 시 기본 이미지 사용
        console.error(`Failed to load image for product ${product.id}`);
      };
    } else {
      setIsLoading(false);
      setImageUrl(noImage);
    }

    setIsSoldOut(product.stockQuantity === 0);
  }, [product.id, product.pictureUrl, product.stockQuantity]);

  const formattedPrice =
      product.fixedPrice !== undefined
          ? product.fixedPrice.toLocaleString()
          : 'N/A';

  const handleAddToCart = () => {
    if (product) {
      addCart(product.id, 1, product.fixedPrice, 'cart');
      setOpenDialog(true);
    }
  };

  const handleBuyNow = () => {
    addOrder(product.id, 1, product.fixedPrice, 'order');
    navigate(`/order`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleGoToCart = () => {
    setOpenDialog(false);
    navigate('/cart');
  };

  return (
      <>
        <Card
            sx={{
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 0px 8px #FF9800',
              },
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
        >
          <Link to={`/product/detail/${product.id}`}>
            <div className="tw-relative tw-pb-[142%]">
              {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
              ) : (
                  <>
                    <CardMedia
                        component="img"
                        sx={{
                          height: '100%',
                        }}
                        className="tw-absolute tw-top-0 tw-left-0 tw-object-contain tw-h-full tw-w-full"
                        image={imageUrl}
                        alt={product.title || 'Product'}
                    />
                    {isSoldOut && (
                        <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              backgroundColor: 'red',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: 'bold',
                              zIndex: 1,
                            }}
                        >
                          품절
                        </Box>
                    )}
                  </>
              )}
            </div>
            <CardContent sx={{
              "&:last-child": {
                paddingBottom: 1
              }
            }}>
              <Typography
                  variant="h7"
                  component="div"
                  className="tw-mb-2 tw-line-clamp-2"
                  fontWeight="bold"
              >
                {product.title || 'Unnamed Product'}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="tw-py-2">
                {product.author || 'Unknown Author'}
              </Typography>
              {/*<Typography variant="h7" component="div">*/}
              {/*  {formattedPrice}원*/}
              {/*</Typography>*/}
              {product.discount ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h8" color="primary" fontWeight="bold" sx={{mr: 1}}>
                      10%
                    </Typography>
                    <Typography variant="body1" sx={{mr: 1, textDecoration: 'line-through', color: 'gray'}}>
                      {formattedPrice}원
                    </Typography>
                    <Typography variant="h7" fontWeight="bold">
                      {(product.fixedPrice * 0.9).toLocaleString()}원
                    </Typography>
                  </Box>
              ) : (
                  <Typography variant="h7" fontWeight="bold">
                    {formattedPrice}원
                  </Typography>
              )}
            </CardContent>
          </Link>


          {/* 구매 관련 버튼 */}
          <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1,
                mt: 'auto',
                py: 2,
                width: '100%'
              }}
          >
            <Button
                variant="outlined"
                onClick={handleAddToCart}
                fullWidth
                sx={{ flexGrow: 1, ml: 2 }}
                disabled={isSoldOut}
            >
              {isSoldOut ? '품절' : '장바구니'}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBuyNow}
                fullWidth
                sx={{ flexGrow: 1, mr: 2 }}
                disabled={isSoldOut}
            >
              바로구매
            </Button>
          </Box>
        </Card>

        {/* 버튼 클릭 시 다이얼로그 */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle></DialogTitle>
          <DialogContent className="tw-mx-6 tw-my-4">
            <Typography variant="body1" align="center">
              <Typography component="span" variant="body1" fontWeight="bold">
                {product?.title}
              </Typography>{' '}
              1권이
              <br />
              장바구니에 추가되었습니다.
            </Typography>
          </DialogContent>
          <DialogActions
              sx={{ justifyContent: 'center', marginBottom: 2, gap: 1 }}
          >
            <Button variant="outlined" onClick={handleCloseDialog}>
              계속 쇼핑
            </Button>
            <Button variant="contained" onClick={handleGoToCart}>
              장바구니로 이동
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
}

export default ProductCard;

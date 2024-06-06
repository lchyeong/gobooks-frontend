import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteUser, getUserInfo, updateUserInfo } from '../../api/authApi';

import { PageContainer } from '../../components/PageContainer';

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user info for user with ID 1 when the component mounts
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(1); // Assuming the ID of the user you want to fetch is 1
        setUserInfo(response);
      } catch (err) {
        console.error('사용자 정보 로딩 실패:', err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onClickUpdate = async () => {
    try {
      const response = await updateUserInfo(1, userInfo); // Passing the ID explicitly
      console.log('업데이트 성공:', response);
      setIsEditing(false);
    } catch (err) {
      console.error('업데이트 오류:', err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
    }
  };

  const onClickDelete = async () => {
    try {
      await deleteUser(1); // Passing the ID explicitly
      console.log('탈퇴 처리되었습니다.');
      // Implement logout or redirect logic here
    } catch (err) {
      console.error('탈퇴 오류:', err);
    }
  };

  return (
    <PageContainer>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4} className="bg-white p-8 rounded-lg shadow-lg">
          <Typography variant="h4" component="h1" gutterBottom className="text-center">
            마이페이지
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              disabled={!isEditing}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              disabled={!isEditing}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="닉네임"
              variant="outlined"
              name="nickname"
              value={userInfo.nickname}
              onChange={handleInputChange}
              error={!!errors.nickname}
              helperText={errors.nickname}
              margin="normal"
              disabled={!isEditing}
              style={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setIsEditing(!isEditing)}
              style={{ marginBottom: '20px' }}
            >
              {isEditing ? '수정 취소' : '정보 수정'}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onClickUpdate}
                style={{ marginBottom: '20px' }}
              >
                업데이트
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={onClickDelete}
            >
              회원 탈퇴
            </Button>
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default MyPage;
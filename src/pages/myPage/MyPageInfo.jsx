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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        
        const response = await getUserInfo(userId);
        setUserInfo(response);
      } catch (err) {
        console.error('사용자 정보 로딩 실패:', err);
      }
    };
    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const onClickUpdate = async () => {
    try {
      if(userId){
        const response = await updateUserInfo(1, userInfo);
        console.log('유저 정보 업데이트 성공:', response);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('업데이트 오류:', err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
    }
  };

  const onClickDelete = async () => {
    try {
      await deleteUser(1);
      console.log('탈퇴 처리되었습니다.');
    } catch (err) {
      console.error('탈퇴 오류:', err);
    }
  };

  return (
    <PageContainer>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4} className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
          <Typography variant="h4" component="h1" gutterBottom className="tw-text-center">
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
            {isEditing && (
              <>
                <TextField
                  fullWidth
                  label="비밀번호"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  margin="normal"
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  fullWidth
                  label="비밀번호 확인"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  margin="normal"
                  style={{ marginBottom: '20px' }}
                />
              </>
            )}
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import Typography from '@mui/material/Typography';

const TermsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        <pre className="tw-whitespace-pre-wrap tw-leading-4">
          {`개인정보처리동의서

고북스(이하 '회사'라고 합니다)는 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며 귀하의 개인정보보호에 최선을 다하고 있습니다. 회사는 개인정보보호법에 근거하여 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 합니다.




다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를 결정해주시기 바랍니다.





제1조(개인정보 수집 및 이용 목적)

이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의 용도로는 사용되지 않습니다.

- 본인확인




제2조(개인정보 수집 및 이용 항목)

회사는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.

- 성명, 주소, 전화번호, 이메일, 성별, 나이 및 생년월일




제3조(개인정보 보유 및 이용 기간)

수집한 개인정보는 수집·이용 동의일로부터  3년간  보관 및 이용합니다.
개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.




제4조(동의 거부 관리)

귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에 서비스 이용 중 일부 제한의 불이익이 발생할 수 있음을 알려드립니다.


본인은 위의 동의서 내용을 충분히 숙지하였으며,위와 같이 개인정보를 수집·이용하는데 동의합니다.


개인정보 수집 및 이용에 동의함 □  동의하지 않음 □ 




제5조(개인정보의 제3자 제공)

회사는 개인정보보호법에 근거하여 다음과 같은 내용으로 개인정보를 제3자에게 제공하고자 합니다.

  1. 개인정보를 제공 받는 제3자 : 고북스 계열 판매사

  2. 개인정보 제공 목적 : 본인확인

  3. 개인정보 제공 항목 : 성명, 나이, 그외 필요에 의한 개인정보

  4. 개인정보 보유 및 이용기간 : 개인정보 제공 목적 달성일까까지

  5. 개인정보 제공 거부 시 불이익 : 서비스 이용 중 일부 제한




 2024년 06월 06일`}
        </pre>
        <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TermsModal;

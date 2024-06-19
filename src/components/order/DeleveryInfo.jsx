import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import CustomButton from '../ui/CustomButton';
import { DeliveryContext } from '../../App';

/**
 * @param props - props 객체
 * @property pageName - 결제 페이지라면. {'pageName': 'orderComplate'}
 * @returns React.FC
 */
const DeleveryInfo = (props) => {
  const {deliveryInfo, setDeliveryInfo} = useContext(DeliveryContext);
  const inputActiveRef =  useRef([]);
  // useEffect(() => {
  //   const button = document.getElementById('dropdownHoverButton');
  //   const dropdown = document.getElementById('dropdownHover');
  //
  //   const showDropdown = () => {
  //     dropdown.classList.remove('tw-hidden');
  //   };
  //
  //   const hideDropdown = () => {
  //     dropdown.classList.add('tw-hidden');
  //   };
  //
  //   button.addEventListener('mouseover', showDropdown);
  //   button.addEventListener('mouseout', hideDropdown);
  //   dropdown.addEventListener('mouseover', showDropdown);
  //   dropdown.addEventListener('mouseout', hideDropdown);
  //
  //   return () => {
  //     button.removeEventListener('mouseover', showDropdown);
  //     button.removeEventListener('mouseout', hideDropdown);
  //     dropdown.removeEventListener('mouseover', showDropdown);
  //     dropdown.removeEventListener('mouseout', hideDropdown);
  //   };
  // }, []);
  useEffect(() => {
    disabledAllInputs();
  }, [])

  useEffect(() => {
    setDeliveryInfo(deliveryInfo);
  }, [deliveryInfo, setDeliveryInfo]);

  const disabledAllInputs = () => {
    console.dir(inputActiveRef);
    inputActiveRef.current.forEach(input => {
      if(input){
        input.disabled = props.inputActive;
      }
    })
  }

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = '';
    // 주소 타입에 따라 처리: R이면 도로명주소, J면 지번주소
    if (data.userSelectedType === 'R') {
      fullAddress = data.roadAddress;
    } else if (data.userSelectedType === 'J') {
      fullAddress = data.jibunAddress;
    }

    // bname = 동, buildingName 건물명
    if (data.buildingName !== '') {
      fullAddress += ` ${data.buildingName}`;
    }

    setDeliveryInfo({
      ...deliveryInfo,
      zipcode: data.zonecode,
      address: fullAddress,
    });
  };

  const handleClick = () => {
    setDeliveryInfo({
      zipcode: '',
      address: '',
    });
    open({ onComplete: handleComplete });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateCustomer = () => {
    const { name, zipcode, address, realAddress, phoneNumber, landlinePhoneNumber } = deliveryInfo;

    if (!name) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!zipcode) {
      alert('우편 번호를 입력해주세요.');
      return false;
    }
    if (!address) {
      alert('주소를 입력해주세요.');
      return false;
    }
    if (!realAddress) {
      alert('실제 주소를 입력해주세요.');
      return false;
    }
    if (!phoneNumber && !landlinePhoneNumber) {
      alert('휴대폰 또는 일반전화 번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  return (
    <div className="tw-w-full">
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">배송주소</h1>
      </header>
      {/*<button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"*/}
      {/*        className="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-inline-flex tw-items-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"*/}
      {/*        type="button">Dropdown hover <svg className="tw-w-2.5 tw-h-2.5 ms-3" aria-hidden="true"*/}
      {/*                                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">*/}
      {/*  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />*/}
      {/*</svg>*/}
      {/*</button>*/}

      {/*<div id="dropdownHover"*/}
      {/*     className="tw-z-10 tw-hidden tw-bg-white tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow tw-w-44 dark:tw-bg-gray-700">*/}
      {/*  <ul className="tw-py-2 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200" aria-labelledby="dropdownHoverButton">*/}
      {/*    <li>*/}
      {/*      <a href="#"*/}
      {/*         className="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-600 dark:hover:tw-text-white">Dashboard</a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a href="#"*/}
      {/*         className="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-600 dark:hover:tw-text-white">Settings</a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a href="#"*/}
      {/*         className="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-600 dark:hover:tw-text-white">Earnings</a>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a href="#"*/}
      {/*         className="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-600 dark:hover:tw-text-white">Sign*/}
      {/*        out</a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
      <div
        className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
        <div className="tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="이름"
            required
            value={deliveryInfo.name}
            ref={el => inputActiveRef.current[0] = el}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-2 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">우편 번호</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="우편 번호"
            required
            value={deliveryInfo.zipcode}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="tw-row-start-2 tw-row-span-1 tw-start-col-2">
          <CustomButton onClick={handleClick} text="주소 찾기" size="large" />
        </div>
        <div className="tw-pl-24 tw-row-start-3 tw-row-span-1 tw-col-span-4 tw-flex tw-items-center">
          <label htmlFor="address" className="tw-block tw-w-40 tw-pl-8">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="주소"
            required
            value={deliveryInfo.address}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="tw-pl-24 tw-row-start-4 tw-row-span-1 tw-col-span-4 tw-flex tw-items-center">
          <label htmlFor="realAddress" className="tw-block tw-w-40 tw-pl-8">실제 주소</label>
          <input
            type="text"
            id="realAddress"
            name="realAddress"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="실제 주소"
            required
            ref={el => inputActiveRef.current[1] = el}
            value={deliveryInfo.realAddress}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-5 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="phoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">휴대폰</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="휴대폰"
            required
            ref={el => inputActiveRef.current[2] = el}
            value={deliveryInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-6 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="landlinePhoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">일반전화</label>
          <input
            type="text"
            id="landlinePhoneNumber"
            name="landlinePhoneNumber"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="일반전화"
            required
            ref={el => inputActiveRef.current[3] = el}
            value={deliveryInfo.landlinePhoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleveryInfo;

import {
  UserInfo,
  UserImg,
  UserName,
  TabMenu,
  MagazineListContainer,
  MagazineListWrap,
  SideTabMenu,
  UserNameInput,
  UserNameChangeButton,
  UserDetail,
} from "./CommonStyle";
import { MainWrapper } from "../../Mainpage/component/MagazineGrid";
import React, { useEffect, useRef, useState } from "react";
import MypageList from "./MypageList";
import { results, result } from "../../Common/Dummy";
import { DataTypes, UserData } from "../../Common/Interface";
import SubscribeList from "./SubscribeList";
import { withRouter, RouteComponentProps } from "react-router-dom";

const MypageMain: React.FC<RouteComponentProps> = ({ history }) => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    profileImage: "",
  });
  useEffect(() => {
    // 컴포넌트가 로드되면 바로 유저 정보 가지고 오는 api 호출
    // dispatch(getUserApi)
    if (!loginState) {
      setLoginState(true);
      setUserData({
        username: "도비",
        profileImage: userData.profileImage
          ? userData.profileImage
          : "/image/default_user.png",
      });
    } else {
      alert("로그인이 필요한 서비스입니다.");
      history.push("/");
    }
  }, []);

  const [curMenu, setCurMenu] = useState<string>("like");
  const [curData, setCurData] = useState<DataTypes[]>([]);
  const [subData, setSubData] = useState<UserData[]>([]);
  useEffect(() => {
    // 메뉴에 따른 데이터 목록 가지고 오는 훅
    if (curMenu === "like") {
      setCurData(results);
    } else if (curMenu === "subscribe") {
      setSubData(result);
    } else if (curMenu === "myFeed") {
      // 내가 작성한 피드 목록 조회 api 출동
      setCurData(results);
    } else if (curMenu === "myMagazine") {
      // 내가 작성한 매거진 목록 조회 api 출동
      setCurData(results);
    }
  }, [curMenu]);

  const [change, setChange] = useState<boolean>(false);
  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const uploadedImage = useRef<HTMLImageElement>(null);
  const imageUploader = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.currentTarget.files) {
      console.log(e.currentTarget.files[0]);
      // setUserData({
      //   ...userData,
      //   profileImage: e.currentTarget.files[0],
      // });
    }
  };

  return (
    // login 상태 여부 확인 후 -> 조건부 렌더링
    <MainWrapper>
      <UserInfo>
        <input
          ref={imageUploader}
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <UserImg
          ref={uploadedImage}
          src={userData.profileImage}
          alt="이미지를 변경하시려면 클릭하세요"
          onClick={() => {
            if (imageUploader.current) {
              console.log(imageUploader.current);
              imageUploader.current.click();
            }
          }}
        />
        <UserDetail>
          {change ? (
            <>
              <UserNameInput
                name="username"
                value={userData.username}
                onChange={changeUsername}
              />
              <UserNameChangeButton
                save
                onClick={() => {
                  // 유저 네임 변경 api 호출
                  console.log(userData.username);
                  setChange(false);
                }}
              >
                닉네임 저장
              </UserNameChangeButton>
            </>
          ) : (
            <>
              <UserName>{userData.username}</UserName>
              <UserNameChangeButton
                onClick={() => {
                  setChange(true);
                }}
              >
                닉네임 수정
              </UserNameChangeButton>
            </>
          )}
        </UserDetail>
      </UserInfo>
      <MagazineListWrap>
        <MagazineListContainer>
          {curMenu === "like" && <MypageList listData={curData} own={false} />}
          {curMenu === "subscribe" && <SubscribeList listData={subData} />}
          {curMenu === "myFeed" && <MypageList listData={curData} own={true} />}
          {curMenu === "myMagazine" && (
            <MypageList listData={curData} own={true} />
          )}
        </MagazineListContainer>
        <SideTabMenu>
          {curMenu === "like" ? (
            <TabMenu cur>좋아요 한 매거진</TabMenu>
          ) : (
            <TabMenu onClick={() => setCurMenu("like")}>
              좋아요 한 매거진
            </TabMenu>
          )}
          {curMenu === "subscribe" ? (
            <TabMenu cur>구독한 유저</TabMenu>
          ) : (
            <TabMenu onClick={() => setCurMenu("subscribe")}>
              구독한 유저
            </TabMenu>
          )}
          {curMenu === "myFeed" ? (
            <TabMenu cur>나의 피드</TabMenu>
          ) : (
            <TabMenu onClick={() => setCurMenu("myFeed")}>나의 피드</TabMenu>
          )}
          {curMenu === "myMagazine" ? (
            <TabMenu cur>나의 매거진</TabMenu>
          ) : (
            <TabMenu onClick={() => setCurMenu("myMagazine")}>
              나의 매거진
            </TabMenu>
          )}
        </SideTabMenu>
      </MagazineListWrap>
    </MainWrapper>
  );
};

export default withRouter(MypageMain);

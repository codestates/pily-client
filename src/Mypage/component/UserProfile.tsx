import { MainWrapper } from "../../Mainpage/component/MagazineGrid";
import {
  UserInfo,
  UserImg,
  UserName,
  TabMenu,
  MagazineListContainer,
  MagazineListWrap,
  SideTabMenu,
} from "./CommonStyle";
import MypageList from "./MypageList";
import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps, match } from "react-router-dom";
import { results, result } from "../../Common/Dummy";
import { DataTypes, UserData } from "../../Common/Interface";

const UserProfile: React.FC<RouteComponentProps> = ({ match }) => {
  const [curData, setCurData] = useState<DataTypes[]>([]);

  const [userData, setUserData] = useState<UserData>({
    profileImage: "",
    username: "",
  });

  const paramUsername: any = match.params;
  useEffect(() => {
    // 라우트에 의한 유저 정보 획득
    // getProfileApi();
    console.log(paramUsername.username);
    const data = result.filter(el => el.username === paramUsername.username);
    console.log(data);
    setUserData(data[0]);
    setCurData(results.filter(el => Number(el.megazineId) % 2));
  }, []);

  return (
    <MainWrapper>
      <UserInfo>
        <UserImg
          src={
            userData?.profileImage
              ? userData.profileImage
              : "/image/default_user.png"
          }
        />
        <UserName>{userData?.username}</UserName>
      </UserInfo>
      <MagazineListWrap>
        <MagazineListContainer>
          <MypageList listData={curData} own={true} />
        </MagazineListContainer>
        <SideTabMenu>
          <TabMenu cur>발행한 매거진</TabMenu>
        </SideTabMenu>
      </MagazineListWrap>
    </MainWrapper>
  );
};

export default withRouter(UserProfile);

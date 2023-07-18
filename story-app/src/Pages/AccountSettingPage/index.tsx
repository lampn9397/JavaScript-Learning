import { connect, ConnectedProps } from "react-redux";

import * as ActionTypes from '../../redux/actionTypes'
import AccountSettingPage from "./AccountSettingPage";
import { RootState } from "@/redux/store";
import { User } from "@/constants/types/user";

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AccountSettingPage)
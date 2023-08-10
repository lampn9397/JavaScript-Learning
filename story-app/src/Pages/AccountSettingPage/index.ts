import { connect, ConnectedProps } from "react-redux";

import AccountSettingPage from "./AccountSettingPage";
import { RootState } from "@/redux/store";

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
};


const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AccountSettingPage)
import { connect } from 'react-redux';
import { getBasicGasEstimateLoadingStatus } from '../../../../../selectors';
import {
  updateSendErrors,
  setMaxModeTo,
  updateSendAmount,
  getGasTotal,
  getSendToken,
  getSendFromBalance,
  getTokenBalance,
  getSendMaxModeState,
} from '../../../../../ducks/send';
import { calcMaxAmount } from './amount-max-button.utils';
import AmountMaxButton from './amount-max-button.component';

export default connect(mapStateToProps, mapDispatchToProps)(AmountMaxButton);

function mapStateToProps(state) {
  return {
    balance: getSendFromBalance(state),
    buttonDataLoading: getBasicGasEstimateLoadingStatus(state),
    gasTotal: getGasTotal(state),
    maxModeOn: getSendMaxModeState(state),
    sendToken: getSendToken(state),
    tokenBalance: getTokenBalance(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAmountToMax: (maxAmountDataObject) => {
      dispatch(updateSendErrors({ amount: null }));
      dispatch(updateSendAmount(calcMaxAmount(maxAmountDataObject)));
    },
    clearMaxAmount: () => {
      dispatch(updateSendAmount('0'));
    },
    setMaxModeTo: (bool) => dispatch(setMaxModeTo(bool)),
  };
}

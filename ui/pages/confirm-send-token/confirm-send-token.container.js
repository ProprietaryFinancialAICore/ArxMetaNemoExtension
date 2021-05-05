import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { clearConfirmTransaction } from '../../ducks/confirm-transaction/confirm-transaction.duck';
import { showSendTokenPage } from '../../store/actions';
import { beginEditingTransaction, updateSendToken } from '../../ducks/send';
import { conversionUtil } from '../../helpers/utils/conversion-util';
import {
  getTokenValueParam,
  getTokenAddressParam,
} from '../../helpers/utils/token-util';
import { sendTokenTokenAmountAndToAddressSelector } from '../../selectors';
import ConfirmSendToken from './confirm-send-token.component';

const mapStateToProps = (state) => {
  const { tokenAmount } = sendTokenTokenAmountAndToAddressSelector(state);

  return {
    tokenAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTransaction: ({ txData, tokenData, tokenProps }) => {
      const {
        id,
        txParams: { from, to: tokenAddress, gas: gasLimit, gasPrice } = {},
      } = txData;

      const to = getTokenValueParam(tokenData);
      const tokenAmountInDec = getTokenAddressParam(tokenData);

      const tokenAmountInHex = conversionUtil(tokenAmountInDec, {
        fromNumericBase: 'dec',
        toNumericBase: 'hex',
      });

      dispatch(
        beginEditingTransaction({
          id: id?.toString(),
          gasLimit,
          gasPrice,
          from,
          amount: tokenAmountInHex,
          to,
        }),
      );

      dispatch(updateSendToken({ ...tokenProps, address: tokenAddress }));

      dispatch(clearConfirmTransaction());
      dispatch(showSendTokenPage());
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmSendToken);

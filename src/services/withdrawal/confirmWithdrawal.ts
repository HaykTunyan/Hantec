import axios from 'axios';
import { toast } from 'react-toastify';

interface WithdrawConfirmPayload {
    paymentMethod: string;
    accountCode: string;
    accountCcy: string;
    companyId: number;
    tradingAccountId: string;
    maxWithdrawalAmt: number;
    userType: string;
    platform: number;
    region: string;
    remarks: string;
}

const ConfirmWithdrawal = async (payload: WithdrawConfirmPayload): Promise<any> => {
    try {
        const response = await axios.post(
            'https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw/1365/confirm',
            payload
        );
        toast.success(" Succesfuly Withdraw confirm");
        return response.data;
    } catch (error) {
        console.error('Error confirming withdrawal:', error);
        throw error;
    }
};

export default ConfirmWithdrawal;

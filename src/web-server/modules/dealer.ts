
import * as Token from '../../utils/token';
import dao from '../../dao';
import session_config from '../../config/session'

const userDao = dao['UserDao'];
const sequelize = dao.sequelize;

export function list_dealers() {
	return userDao.listDealers()
	.then((ds : any) => {
		return {
			code : 0,
			data : ds
		};
	});
}

interface ListDealerRecordsParam {
	token : string,
	page : number
}

export function list_dealer_records(param : ListDealerRecordsParam) {
	let ret = Token.parse(param.token, session_config.secret);
	if (!ret)
		return { code : 404, msg : 'token error' };

	console.log('ret.uid: ' + ret.uid + ' page:' + param.page);

	return userDao.listDealerRecords(ret.uid, param.page)
	.then((ret : any) => {
		return {
			code : 0,
			data : ret
		};
	});
}

interface TransferParam {
	token : string,
	to : string,
	amount : number
}

export function transfer(param : TransferParam) {
	let ret = Token.parse(param.token, session_config.secret);
	if (!ret)
		return { code : 404, msg : 'token error' };

	let amount = param.amount;
	if (!amount || amount <= 0)
		return { code : 500, msg : '转账金额必须大于0' };

	return userDao.transfer(ret.uid, param.to, amount)
	.then(() => {
		return { code : 0 };
	})
	.catch((err : any) => {
		return { code : 500, msg : err };
	});
}

const exp : any = {
	'list_dealers' : list_dealers,
	'list_dealer_records' : list_dealer_records,
	'transfer' : transfer
};

export default exp;


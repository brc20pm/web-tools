function truncateDecimal(number, decimals) {
	var factor = Math.pow(10, decimals);
	var tempNumber = number * factor;
	tempNumber = Math.floor(tempNumber); // 向下取整
	const d = tempNumber / factor
	if(d==0){
		return '0.00000'
	}
	
	return d;
}

export default {
	truncateDecimal
}
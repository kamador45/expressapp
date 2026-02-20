// 20 - 30 cordobas aproximadamente el kilometro
export const calculatePrices = (distance, vehicleType) => {
    const appCommissionPercentage = 0.20;

    let baseFare = 0;

    switch (vehicleType) {
        case 'Bike':
            baseFare = 15;
            break;
        case 'pick-up':
            baseFare = 30;
            break;
        case 'Cool':
            baseFare = 30;
            break;
        default:
            throw new Error('Tipo de vehiculo no valido');
    }

    const basePrice = baseFare  * distance;
    const totalPrice = basePrice / (1 - appCommissionPercentage);

    return totalPrice.toFixed(2);
}

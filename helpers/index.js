const formatMoney = (cantidad) => {

    return cantidad.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD'
    })

}

export default formatMoney

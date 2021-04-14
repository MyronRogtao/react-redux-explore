
const Order = (props) => {
    let ingredients = null;
    const ingArray = [];
    if (props.ingredients) {
        for(let igName in props.ingredients) {
            ingArray.push({
                name: igName,
                quantity: props.ingredients[igName]
            })
        }
        ingredients = ingArray.map((ing, index) => <span key={index}
                style={{textTransform: 'capitalize', margin: '1px 5px', boxShadow: '1px 1px', padding: '2px', border: '1px solid gray'}}>
                    {ing.name} ({ing.quantity})
                </span>)
    }

    return (
        <div style={{width:'100%', boxShadow: '1px 1px', border: '1px solid gray', padding: '0 20px', marginBottom: '5px'}}>
            <p> <b>Ingredients : </b>{ingredients}</p>
            <p> <b>Total Price : </b><span>{props.price}</span></p>
        </div>
    );
}

export default Order;
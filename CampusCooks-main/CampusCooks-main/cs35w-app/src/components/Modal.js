function Modal(props) {

    function favHandler() {
        console.log("fav!!!")
    }
    function upvoteHandler() {
        console.log("upvote!!")
    }
    return (
        <div className='Modal'>
            <p>Salad recipes are my favorite way to showcase vibrant, in-season produce – fruits and veggies that are so good on their own that you don’t need to do much to make them into a delicious meal. On cold winter nights, I like to brighten up our dinner table with a big, colorful mix of root veggies and hearty greens. On beautiful, warm days when I’d rather be outside than in the kitchen, summer salads are the perfect solution: they’re simple to toss together, but they’re totally delicious nonetheless.
            </p>
            <button className="btn btn--alt" onClick={() => {
                favHandler();
                props.onCancel();
            }}>favorite</button>
            <button className="btn" onClick={() => {
                upvoteHandler();
                props.onCancel();
            }}>Upvote</button>
        </div>
    )

}

export default Modal;
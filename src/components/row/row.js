const Row = (left, right) => {
    return (
        <div className="row">
            <div className="coll-md-4">
                {left}
            </div>
            <div className="coll-md-8">
                {right}
            </div>
        </div>
    )
}

export default Row
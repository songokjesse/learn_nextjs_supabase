const Navbar = () => {
    return(
        <div className="navbar bg-success text-success-content">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">My School</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
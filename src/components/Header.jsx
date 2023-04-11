import React, { useState } from "react";
import Logo from "../assets/img/logo.png";
import Avatar from "../assets/img/avatar.png";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const [{ user }, dispatch] = useStateValue();

	const [isMenu, setIsMenu] = useState(false);

	const login = async () => {
		if (!user) {
			const {
				user: { refreshToken, providerData },
			} = await signInWithPopup(firebaseAuth, provider);
			dispatch({
				type: actionType.SET_USER,
				user: providerData[0],
			});
			localStorage.setItem("user", JSON.stringify(providerData[0]));
		} else {
			setIsMenu(!isMenu);
		}
	};

	return (
		<header className="fixed z-50 w-screen p-6 px-16">
			{/* Desktop & tablet */}
			<div className=" hidden md:flex w-full items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<img src={Logo} className="w-8 object-cover" alt="logo" />
					<p className="text-headingColor text-xl font-bold ">City</p>
				</Link>
				<div className="flex items-center gap-8">
					<ul className="flex items-center gap-8 ">
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
							Home
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
							Menu
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
							About Us
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
							Service
						</li>
					</ul>
					<div className="relative flex items-center justify-center">
						<RiShoppingBasketLine className="text-textColor text-2xl ml-8 cursor-pointer" />
						<div className=" absolute -top-2 -right-2  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
							<p className="text-xs text-white font-semibold">2</p>
						</div>
					</div>
					<div className="relative">
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user ? user.photoURL : Avatar}
							alt="userProfile"
							className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-xl cursor-pointer rounded-full"
							onClick={login}
						/>
						{isMenu && (
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.6 }}
								className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  right-0 top-12 "
							>
								{user && user.email === "milansuvi@gmail.com" && (
									<Link to="/createItem">
										<p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
											New Item <MdAdd />
										</p>
									</Link>
								)}
								<p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
									Logout <MdLogout />
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</div>
			{/* Mobile */}
			<div className="flex md:hidden w-full"></div>
		</header>
	);
};

export default Header;

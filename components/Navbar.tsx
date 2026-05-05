import React from 'react';
import { Box } from 'lucide-react'
import Button from "./ui/Button";

function Navbar() {

    const isSignedIn = false;
    const username = 'Michal';

    const handleAuthClick = async () => {};
    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Box className="logo"/>
                        <span className="name">Planly AI</span>
                    </div>
                    <ul className="links">
                        <a href="#">Product</a>
                        <a href="#">Pricing</a>
                        <a href="#">Community</a>
                        <a href="#">Enterprise</a>
                    </ul>
                </div>
                <div className="actions">
                    {isSignedIn ?
                        <>
                            <span className="greeting">{username ? `Hi, ${username}` : 'Signed In'}
                            </span>
                            <Button size="sm" onClick={handleAuthClick} className="btn">
                                Log Out
                            </Button>
                        </>:
                        (<>
                            <Button size="sm" variant="ghost" onClick={handleAuthClick}>Login</Button>
                            <a href="#upload" className="cta">Get Started</a>
                        </>)}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
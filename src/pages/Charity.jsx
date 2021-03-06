import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "./Charity.css";
import leaderboard from './Group 1055.png'
import mintemoji from './blob.gif'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import woodBronze from './wood-bronze.png';
import woodDiamond from './wood-diamond.png';
import woodGold from './wood-gold.png';
import woodSilver from './wood-silver.png';
import woodWood from './wood-wood.png';
import bronzeBronze from './bronze-bronze.png';
import bronzeDiamond from './bronze-diamond.png';
import bronzeGold from './bronze-gold.png';
import bronzeSilver from './bronze-silver.png';
import bronzeWood from './bronze-wood.png';
import silverBronze from './silver-bronze.png';
import silverDiamond from './silver-diamond.png';
import silverGold from './silver-gold.png';
import silverSilver from './silver-silver.png';
import silverWood from './silver-wood.png';
import goldBronze from './gold-bronze.png';
import goldDiamond from './gold-diamond .png';
import goldGold from './gold-gold.png';
import goldSilver from './gold-silver.png';
import goldWood from './gold-wood.png';
import diamondBronze from './diamond-bronze.png';
import diamondDiamond from './diamond-diamond.png';
import diamondGold from './diamond-gold.png';
import diamondSilver from './diamond-silver.png';
import diamondWood from './diamond-wood.png';
import noNft from './noNft.png';

import Web3 from "web3";
import donations from "../donations";
import ukraine from "../ukraine";


function Charity() {
    const [account, setAccount] = useState(null);
    const [copied, setCopied] = useState(false);
    const [userDeserves, setUserDeserves] = useState(0);
    const [userTokens, setUserTokens] = useState(0);

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            setAccount(account);
            checkAccount(account);
        } else {
            console.log("No authorized account yet.")
        }
    }

    const checkTotalRaised = async () => {
        donations.methods.getTotalRaised("0x165CD37b4C644C2921454429E7F9358d18A45e14").call().then(result => {
            let totalRaised = parseInt(result) / (10 ** 18);
            let raisedText = totalRaised.toString() + " total ETH raised"
            document.getElementById("totalRaisedLabel").innerHTML = raisedText;
        });
    }

    const checkAccount = async (_account) => {
        ukraine.methods.getTokenByUser(_account).call().then(result => {
            let userToken = parseInt(result);

            document.getElementById("nft0").style.display = "none";
            document.getElementById("nft" + userToken.toString()).style.display = "block";

            donations.methods.getGiven("0x165CD37b4C644C2921454429E7F9358d18A45e14", _account).call().then(result => {
                let myTotalGiven = parseInt(result) / (10 ** 18);
                let givenText = "You've given " + myTotalGiven.toString() + " ETH.";
                document.getElementById("myUserGiven").innerHTML = givenText;

                donations.methods.getRaised("0x165CD37b4C644C2921454429E7F9358d18A45e14", _account).call().then(result2 => {
                    let myTotalRaised = parseInt(result2) / (10 ** 18);
                    let raisedText = "You've raised " + myTotalRaised.toString() + " ETH.";
                    document.getElementById("myUserRaised").innerHTML = raisedText;

                    let userGiven = myTotalGiven * (10 ** 18);
                    let userRaised = myTotalRaised * (10 ** 18);

                    var userDeserves = 0;
                    if (userGiven < 10 ** 16) {
                        if (userRaised < 10 ** 16) {
                            if (userGiven == 0 && userRaised == 0) {
                                userDeserves = 0;
                            } else {
                                userDeserves = 1;
                            }
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 2;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 3;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 4;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 5;
                        }
                    } else if (userGiven < 10 ** 17) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 6;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 7;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 8;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 9;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 10;
                        }
                    } else if (userGiven < 10 ** 18) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 11;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 12;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 13;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 14;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 15;
                        }
                    } else if (userGiven < 10 ** 19) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 16;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 17;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 18;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 19;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 20;
                        }
                    } else if (userGiven < 10 ** 29) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 21;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 22;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 23;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 24;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 25;
                        }
                    }


                    if (userToken == 0 && userDeserves != 0) {
                        // show mint prompt
                        document.getElementById("promptMint").style.display = "block";
                    } else if (userToken != 0 && userToken != userDeserves && userDeserves != 0) {
                        // show update prompt
                        document.getElementById("promptUpdate").style.display = "block";

                    }

                });
            });
        });
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install Metamask!");
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (err) {
            console.log(err);
            alert("There was an issue connecting your wallet. Please try again!")
        }
    }

    const handleDonate = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);


        //getters
        ukraine.methods.getTokenByUser(account).call().then(result => {
            let userToken = parseInt(result);
            donations.methods.getGiven("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                let userGiven = parseInt(result);
                donations.methods.getRaised("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                    let userRaised = parseInt(result);
                    const amount = parseFloat(document.getElementById("inputAmount").value);

                    //referral
                    if (urlParams.has('ref')) {
                        let referral = urlParams.get("ref");

                        donations.methods.donateWithRefferral("0x165CD37b4C644C2921454429E7F9358d18A45e14", referral).send({ from: account, value: amount * 1000000000000000000 }).then(result => {

                            handleCloseDonate();
                            userGiven += amount * 1000000000000000000;

                            var userDeserves = 0;
                            if (userGiven < 10 ** 16) {
                                if (userRaised < 10 ** 16) {
                                    if (userGiven == 0 && userRaised == 0) {
                                        userDeserves = 0;
                                    } else {
                                        userDeserves = 1;
                                    }
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 2;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 3;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 4;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 5;
                                }
                            } else if (userGiven < 10 ** 17) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 6;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 7;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 8;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 9;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 10;
                                }
                            } else if (userGiven < 10 ** 18) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 11;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 12;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 13;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 14;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 15;
                                }
                            } else if (userGiven < 10 ** 19) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 16;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 17;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 18;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 19;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 20;
                                }
                            } else if (userGiven < 10 ** 29) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 21;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 22;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 23;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 24;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 25;
                                }
                            }
                            //setUserDeserves(userDeserves);
                            //setUserTokens(userToken);

                            if (userToken == 0) {
                                //if hasn't minted, mint
                                handleShowMint();
                            } else if (userToken != userDeserves && userDeserves != 0) {
                                handleShowUpdateMint();
                            }


                            //if minted but able to update, update


                        });


                        //no referral
                    } else {

                        donations.methods.donate("0x165CD37b4C644C2921454429E7F9358d18A45e14").send({ from: account, value: amount * 1000000000000000000 }).then(result => {

                            handleCloseDonate();
                            userGiven += amount * 1000000000000000000;

                            var userDeserves = 0;
                            if (userGiven < 10 ** 16) {
                                if (userRaised < 10 ** 16) {
                                    if (userGiven == 0 && userRaised == 0) {
                                        userDeserves = 0;
                                    } else {
                                        userDeserves = 1;
                                    }
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 2;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 3;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 4;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 5;
                                }
                            } else if (userGiven < 10 ** 17) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 6;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 7;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 8;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 9;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 10;
                                }
                            } else if (userGiven < 10 ** 18) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 11;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 12;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 13;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 14;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 15;
                                }
                            } else if (userGiven < 10 ** 19) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 16;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 17;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 18;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 19;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 20;
                                }
                            } else if (userGiven < 10 ** 29) {
                                if (userRaised < 10 ** 16) {
                                    userDeserves = 21;
                                } else if (userRaised < 10 ** 17) {
                                    userDeserves = 22;
                                } else if (userRaised < 10 ** 18) {
                                    userDeserves = 23;
                                } else if (userRaised < 10 ** 19) {
                                    userDeserves = 24;
                                } else if (userRaised < 10 ** 29) {
                                    userDeserves = 25;
                                }
                            }
                            //setUserDeserves(userDeserves);
                            //setUserTokens(userToken);

                            if (userToken == 0) {
                                //if hasn't minted, mint
                                handleShowMint();
                            } else if (userToken != userDeserves && userDeserves != 0) {
                                handleShowUpdateMint();
                            }


                            //if minted but able to update, update


                        });


                    }



                });
            });

        });


    }

    const handleMint = async () => {


        ukraine.methods.getTokenByUser(account).call().then(result => {
            let userToken = parseInt(result);
            donations.methods.getGiven("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                let userGiven = parseInt(result);
                donations.methods.getRaised("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                    let userRaised = parseInt(result);

                    var userDeserves = 0;
                    if (userGiven < 10 ** 16) {
                        if (userRaised < 10 ** 16) {
                            if (userGiven == 0 && userRaised == 0) {
                                userDeserves = 0;
                            } else {
                                userDeserves = 1;
                            }
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 2;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 3;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 4;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 5;
                        }
                    } else if (userGiven < 10 ** 17) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 6;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 7;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 8;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 9;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 10;
                        }
                    } else if (userGiven < 10 ** 18) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 11;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 12;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 13;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 14;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 15;
                        }
                    } else if (userGiven < 10 ** 19) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 16;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 17;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 18;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 19;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 20;
                        }
                    } else if (userGiven < 10 ** 29) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 21;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 22;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 23;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 24;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 25;
                        }
                    }

                    ukraine.methods.mint(userDeserves).send({ from: account }).then(result => {
                        alert("Minted NFT successfully");
                        handleCloseMint();
                    });
                });

            });

        });
    }

    const handleUpdateMint = async () => {
        ukraine.methods.getTokenByUser(account).call().then(result => {
            let userToken = parseInt(result);
            donations.methods.getGiven("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                let userGiven = parseInt(result);
                donations.methods.getRaised("0x165CD37b4C644C2921454429E7F9358d18A45e14", account).call().then(result => {
                    let userRaised = parseInt(result);

                    var userDeserves = 0;
                    if (userGiven < 10 ** 16) {
                        if (userRaised < 10 ** 16) {
                            if (userGiven == 0 && userRaised == 0) {
                                userDeserves = 0;
                            } else {
                                userDeserves = 1;
                            }
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 2;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 3;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 4;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 5;
                        }
                    } else if (userGiven < 10 ** 17) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 6;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 7;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 8;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 9;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 10;
                        }
                    } else if (userGiven < 10 ** 18) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 11;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 12;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 13;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 14;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 15;
                        }
                    } else if (userGiven < 10 ** 19) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 16;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 17;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 18;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 19;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 20;
                        }
                    } else if (userGiven < 10 ** 29) {
                        if (userRaised < 10 ** 16) {
                            userDeserves = 21;
                        } else if (userRaised < 10 ** 17) {
                            userDeserves = 22;
                        } else if (userRaised < 10 ** 18) {
                            userDeserves = 23;
                        } else if (userRaised < 10 ** 19) {
                            userDeserves = 24;
                        } else if (userRaised < 10 ** 29) {
                            userDeserves = 25;
                        }
                    }

                    if (userToken != 0 && userToken != userDeserves) {
                        ukraine.methods.update(userDeserves).send({ from: account }).then(result => {
                            alert("Updated NFT successfully");
                            handleCloseUpdateMint();
                        });
                    }
                });

            });

        });
    }

    useEffect(() => {
        document.getElementById("nft0").style.display = "block";
        checkWalletIsConnected().then(() => {
            checkTotalRaised();
        });
    }, [])

    // Donate modal
    const [showDonate, setShowDonate] = useState(false);
    const handleCloseDonate = () => setShowDonate(false);
    const handleShowDonate = () => setShowDonate(true);

    // Raise modal
    const [showRaise, setShowRaise] = useState(false);
    const handleCloseRaise = () => { setShowRaise(false); setCopied(false); }
    const handleShowRaise = () => setShowRaise(true);

    // Mint modal
    const [showMint, setShowMint] = useState(false);
    const handleCloseMint = () => setShowMint(false);
    const handleShowMint = () => setShowMint(true);

    // Update mint modal
    const [showUpdateMint, setShowUpdateMint] = useState(false);
    const handleCloseUpdateMint = () => setShowUpdateMint(false);
    const handleShowUpdateMint = () => setShowUpdateMint(true);

    return (
        <div className="container">
            <div className="wallet-connect">
                {account ? <div className="account-container">
                    <Button className="wallet-connected">Wallet connected </Button>
                </div>
                    : <div>
                        <Button onClick={connectWalletHandler} className="wallet-not-connected">Connect wallet</Button>
                    </div>}
            </div>
            <div className="header">
                <h2 id="totalRaisedLabel">0.00 Total ETH raised</h2>
                <h1>Ukrainian Crisis</h1>
                <p>Stand with the people of Ukraine.</p>
                <div className="buttons">
                    <Button onClick={handleShowDonate} className="donate-button">Donate</Button>
                    <div className="spacer-2"> </div>
                    <Button onClick={handleShowRaise} className="raise-button">Raise</Button>
                </div>

                <div className="mint-div promptMint" id="promptMint">
                    <div className="mint-div-head">
                        <img src={mintemoji} className="mint-div-img" />
                        <div className="spacer"></div>
                        <p>Redeem your NFT for your first donation by clicking the mint button below!</p>
                    </div>
                    <Button onClick={handleShowMint} className="mint-button">Mint</Button>
                </div>

                <div className="mint-div promptUpdate" id="promptUpdate">
                    <div className="mint-div-head">
                        <img src={mintemoji} className="mint-div-img" />
                        <div className="spacer"></div>
                        <p>Update your NFT for your other donations by clicking the update button below!</p>
                    </div>
                    <Button onClick={handleShowUpdateMint} className="mint-button">Update</Button>
                </div>

            </div>
            <div className="user-NFT">
                    <div className="userStats">
                        <img src={diamondDiamond} className="userNFT" id="nft25" />
                        <img src={diamondGold} className="userNFT" id="nft24" />
                        <img src={diamondSilver} className="userNFT" id="nft23" />
                        <img src={diamondBronze} className="userNFT" id="nft22" />
                        <img src={diamondWood} className="userNFT" id="nft21" />
                        <img src={goldDiamond} className="userNFT" id="nft20" />
                        <img src={goldGold} className="userNFT" id="nft19" />
                        <img src={goldSilver} className="userNFT" id="nft18" />
                        <img src={goldBronze} className="userNFT" id="nft17" />
                        <img src={goldWood} className="userNFT" id="nft16" />
                        <img src={silverDiamond} className="userNFT" id="nft15" />
                        <img src={silverGold} className="userNFT" id="nft14" />
                        <img src={silverSilver} className="userNFT" id="nft13" />
                        <img src={silverBronze} className="userNFT" id="nft12" />
                        <img src={silverWood} className="userNFT" id="nft11" />
                        <img src={bronzeDiamond} className="userNFT" id="nft10" />
                        <img src={bronzeGold} className="userNFT" id="nft9" />
                        <img src={bronzeSilver} className="userNFT" id="nft8" />
                        <img src={bronzeBronze} className="userNFT" id="nft7" />
                        <img src={bronzeWood} className="userNFT" id="nft6" />
                        <img src={woodDiamond} className="userNFT" id="nft5" />
                        <img src={woodGold} className="userNFT" id="nft4" />
                        <img src={woodSilver} className="userNFT" id="nft3" />
                        <img src={woodBronze} className="userNFT" id="nft2" />
                        <img src={woodWood} className="userNFT" id="nft1" />
                        <img src={noNft} className="userNFT" id="nft0" />
                    </div>
                    <div className="spacer"></div>
                    <div>
                    {account ? <div className="nft-desc">
                        <h5 id="myUserGiven" className=""></h5>
                        <h5 id="myUserRaised" className=""></h5>
                    </div>
                        : <h5>You have not donated or raised quite yet. Get started above!</h5>}
                        <div>
                    <a href="https://testnets.opensea.io/collection/altruia-x-ukraine-donation-collection-v2" className="opensea" target="_blank">View the collection on OpenSea!</a>
                    </div>
                </div>
                </div>
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <h3>Leaderboard (Beta)</h3>
                    <p>Top donors to the Ukrainian Crisis</p>
                </div>
                <img src={leaderboard} className="leaderboard-img" />
            </div>
            <h4 className="gallery-header">Tokens of appreciation</h4>
            <p className="gallery-header">We'll mint an NFT to represent your contribution to the Ukrainian Crisis.</p>
            <div className="NFT-grid">
                <img src={diamondDiamond} className="NFT" />
                <img src={diamondGold} className="NFT" />
                <img src={diamondSilver} className="NFT" />
                <img src={diamondBronze} className="NFT" />
                <img src={diamondWood} className="NFT" />
                <img src={goldDiamond} className="NFT" />
                <img src={goldGold} className="NFT" />
                <img src={goldSilver} className="NFT" />
                <img src={goldBronze} className="NFT" />
                <img src={goldWood} className="NFT" />
                <img src={silverDiamond} className="NFT" />
                <img src={silverGold} className="NFT" />
                <img src={silverSilver} className="NFT" />
                <img src={silverBronze} className="NFT" />
                <img src={silverWood} className="NFT" />
                <img src={bronzeDiamond} className="NFT" />
                <img src={bronzeGold} className="NFT" />
                <img src={bronzeSilver} className="NFT" />
                <img src={bronzeBronze} className="NFT" />
                <img src={bronzeWood} className="NFT" />
                <img src={woodDiamond} className="NFT" />
                <img src={woodGold} className="NFT" />
                <img src={woodSilver} className="NFT" />
                <img src={woodBronze} className="NFT" />
                <img src={woodWood} className="NFT" />
            </div>

            <Modal show={showDonate} onHide={handleCloseDonate} className="donateModal" size="lg">
                <Modal.Header closeButton className="modalHeader btn-close-white">
                </Modal.Header>
                <Modal.Body className="justify-content-center modalBody">
                    <Modal.Title><div><h5 className="modalTitle">Donate</h5></div></Modal.Title>
                    <p className="modalSubtitle">Contribute a standard amount or suggest your own.</p>
                </Modal.Body>
                <Form>
                    <Form.Group className="mb-3 d-flex justify-content-center" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" className="amountInput shadow-none mb-3" placeholder="Amount" id="inputAmount" />
                        <Form.Label className="mb-3">
                            ETH
                        </Form.Label>
                    </Form.Group>
                    <Button variant="primary" onClick={handleDonate} className="send-button">
                        Send
                    </Button>
                </Form>
            </Modal>

            <Modal show={showRaise} onHide={handleCloseRaise} className="raiseModal" size="lg">
                <Modal.Header closeButton className="modalHeader btn-close-white">
                </Modal.Header>
                <Modal.Body className="justify-content-center modalBody">
                    <Modal.Title><h5>Raise</h5></Modal.Title>
                    <p className="modalSubtitle">Invite others to contribute through your referral link.</p>
                    <div className="invite-row">
                        <p className="inviteLink">{`https://altruia.xyz/ukrainian-crisis?ref=${account}`}</p>
                        <div className="spacer-2"></div>
                        {copied ? <Button variant="primary" className="copy-link-button">Copied</Button> :
                            <Button variant="primary" onClick={() => {
                                navigator.clipboard.writeText(`https://altruia.xyz/ukrainian-crisis?ref=${account}`);
                                setCopied(true);
                            }} className="copy-link-button">
                                Copy
                            </Button>
                        }
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showMint} onHide={handleCloseMint} className="mintModal" size="lg">
                <Modal.Header closeButton className="modalHeader btn-close-white">
                </Modal.Header>
                <Modal.Body className="justify-content-center modalBody">
                    <Modal.Title><h5>Mint</h5></Modal.Title>
                    <p className="modalSubtitle">As a token of your first donation to the Ukrainian Crisis, mint your NFT!</p>
                    <div className="invite-row">
                        <Button variant="primary" onClick={handleMint} className="copy-link-button">Mint</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateMint} onHide={handleCloseUpdateMint} className="mintModal" size="lg">
                <Modal.Header closeButton className="modalHeader btn-close-white">
                </Modal.Header>
                <Modal.Body className="justify-content-center modalBody">
                    <Modal.Title><h5>Update Mint</h5></Modal.Title>
                    <p className="modalSubtitle">Update your NFT to reflect the latest contrubution to the Ukrainian Crisis.</p>
                    <div className="invite-row">
                        <Button variant="primary" onClick={handleUpdateMint} className="copy-link-button">Update</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Charity;
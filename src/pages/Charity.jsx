import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "./Charity.css";
import leaderboard from './leaderboard.png'
import mintemoji from './blob.gif'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Web3 from "web3";
import donations from "../donations";
import ukraine from "../ukraine";


function Charity() {
    const [account, setAccount] = useState(null);
    const [copied, setCopied] = useState(false);
    const [updateMint, setUpdateMint] = useState(false);
    const [referrer, setReferrer] = useState(null);


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
        } else {
            console.log("No authorized account yet.")
        }
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
            donations.methods.getGiven("0x92644E66DACA94F720875A93a8df011CB17dbFC0", account).call().then(result => {
                let userGiven = parseInt(result);
                donations.methods.getRaised("0x92644E66DACA94F720875A93a8df011CB17dbFC0", account).call().then(result => {
                    let userRaised = parseInt(result);
                    const amount = parseFloat(document.getElementById("inputAmount").value);

                    //referral
                    if (urlParams.has('ref')) {
                        let referral = urlParams.get("ref");
                        
                        donations.methods.donate("0x92644E66DACA94F720875A93a8df011CB17dbFC0").send({ from: account, value: amount * 1000000000000000000 }).then(result => {

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

                            if (userToken == 0) {
                                //if hasn't minted, mint
                                handleShowMint();
                            } else if (userToken != userDeserves && userDeserves != 0) {
                                alert("Update your NFT");
                            }
                            

                            //if minted but able to update, update


                        });


                    //no referral
                    } else {

                        donations.methods.donate("0x92644E66DACA94F720875A93a8df011CB17dbFC0").send({ from: account, value: amount * 1000000000000000000 }).then(result => {

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

                            if (userToken == 0) {
                                //if hasn't minted, mint
                                handleShowMint();
                            } else if (userToken != userDeserves && userDeserves != 0) {
                                alert("Update your NFT");
                            }
                            

                            //if minted but able to update, update


                        });


                    }



                });
            });

        });


    }

    useEffect(() => {
        checkWalletIsConnected();
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

    return (
        <div className="container">
            <div className="wallet-connect">
                {account ? <Button className="wallet-connected">Wallet connected </Button>
                    : <Button onClick={connectWalletHandler} className="wallet-not-connected">Connect wallet</Button>}
            </div>
            <div className="header">
                <h2>$1,000,000 raised</h2>
                <h1>Ukrainian Crisis</h1>
                <p>Stand with the people of Ukraine.</p>
                <div className="buttons">
                    <Button onClick={handleShowDonate} className="donate-button">Donate</Button>
                    <div className="spacer"> </div>
                    <Button onClick={handleShowRaise} className="raise-button">Raise</Button>
                </div>
                <div className="mint-div">
                    <div className="mint-div-head">
                        <img src={mintemoji} className="mint-div-img"/>
                        <div className="spacer"></div>
                        <p>Redeem your NFT for your first donation by clicking the mint button below!</p>
                    </div>
                    <Button onClick={handleShowMint} className="mint-button">Mint</Button>
                </div>
            </div>
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <h3>Leaderboard</h3>
                    <p>Top donors to the Ukrainian Crisis</p>
                </div>
                <img src={leaderboard} className="leaderboard-img"/>
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
                        <p className="inviteLink">{`https://altruia.com/ukrainian-crisis?ref=${account}`}</p>
                        <div className="spacer"></div>
                        {copied ? <Button variant="primary" className="copy-link-button">Copied</Button> :
                            <Button variant="primary" onClick={() => {
                                navigator.clipboard.writeText("https://altruia.com/ukrainian-crisis?ref=0x123978561298376128346");
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
                    {copied ? <p className="modalSubtitle">As a token of your first donation to the Ukrainian Crisis, mint your NFT!</p>
                        : <p className="modalSubtitle">Update your NFT here to reflect your latest contributions!</p>}
                    <div className="invite-row">
                        {copied ? <Button variant="primary" className="copy-link-button">Update mint</Button> :
                            <Button variant="primary" className="copy-link-button">Mint</Button>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Charity;
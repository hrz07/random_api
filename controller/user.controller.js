const fs = require('fs');
const getRandomIndex = require('../utils/getRandomIndex');


// to get all the users from userData.json 
module.exports.getAllUsers = (req, res) => {
    try {
        fs.readFile('userData.json', (error, data) => {
            error ?
                res.send({ success: false })
                :
                res.send({ success: true, data: JSON.parse(data) })
        })
    }
    catch {
        res.send({ success: false });
    }
};

// to get a random user from userData.json 
module.exports.getARandomUser = (req, res) => {
    try {
        fs.readFile('userData.json', (error, data) => {

            if (error) {
                res.send({ success: false })
            }
            else {
                const getRandomNumber = () => {
                    const randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber < JSON.parse(data).length) {
                        return randomNumber;
                    } else {
                        return getRandomNumber();
                    }
                };

                const randomIndex = getRandomNumber();
                const users = JSON.parse(data);
                res.send({ success: true, data: users[randomIndex] });
            }
        })
    }
    catch {
        res.send({ success: false });
    }
};

// to save a new user in userData.json 
module.exports.saveAUser = (req, res) => {
    try {
        const newUser = req.body;
        if ((newUser.id && newUser.gender && newUser.name && newUser.contact && newUser.address && newUser.photoUrl)) {
            if (typeof (newUser.id) === "number") {
                fs.readFile('userData.json', (error, data) => {
                    if (error) {
                        res.send({ success: false })
                    }
                    else {
                        const users = JSON.parse(data);
                        const exist = users.find(user => user.id === Number(newUser.id));
                        if (exist) {
                            res.send({ success: false, message: "User ID already exist" });
                        }
                        else {

                            users.push(newUser);
                            fs.writeFile('userData.json', JSON.stringify(users), (error) => {
                                error ?
                                    res.send({ success: false })
                                    :
                                    res.send({ success: true, message: "User Successfully created!" })
                            })
                        }
                    }
                })
            }
            else {
                res.send({ success: false, message: "Please Provide ID as a Number type" });
            }
        }
        else {
            res.send({ success: false, message: "Please provide all required properties to create a user" });
        }
    }
    catch {
        res.send({ success: false });
    }
};

// to update a particular user based on id
module.exports.updateAUser = (req, res) => {
    try {
        const { id, ...rest } = req.body;
        fs.readFile("userData.json", (error, data) => {
            if (error) {
                res.send({ success: false })
            }
            else {
                const users = JSON.parse(data);
                const existUser = users.find(user => user.id === Number(id));
                if (existUser) {
                    const restUsers = users.filter(user => user.id !== Number(id));
                    const updateEntries = Object.entries(rest);
                    for (const key in existUser) {
                        updateEntries.forEach(entries => {
                            if (key === entries[0]) {
                                existUser[key] = entries[1];
                            } else {
                                return;
                            }
                        })
                    }
                    restUsers.push(existUser);
                    fs.writeFile('userData.json', JSON.stringify(restUsers), (error) => {
                        error ?
                            res.send({ success: false, message: "Fail to Update..." })
                            :
                            res.send({ success: true, message: "User Updated Successfully!" });
                    })
                }
                else {
                    res.send({ success: false, message: "User Not Found!" })
                }
            }
        })
    }
    catch {
        res.send({ success: false });
    }
};


// to bulk update multiple users 
module.exports.updateMultipleUsers = (req, res) => {
    try {
        const updatingUsers = req.body;

        fs.readFile("userData.json", (error, data) => {
            if (error) {
                res.send({ success: false })
            }
            else {
                const users = JSON.parse(data);
                let restUsers;
                let isExist = false;
                for (const updatingUser of updatingUsers) {
                    const exist = users.find(user => user.id === updatingUser.id);
                    exist && (isExist = true);
                    restUsers = users.filter(user => user.id !== updatingUser.id);
                    users.forEach(user => {
                        if (user.id === updatingUser.id) {
                            const updateEntries = Object.entries(updatingUser);
                            for (const key in user) {
                                updateEntries.forEach(entries => {
                                    if (key === entries[0]) {
                                        user[key] = entries[1];
                                    } else {
                                        return;
                                    }
                                })
                            }
                            restUsers.push(user);
                        }
                    })
                }
                fs.writeFile("userData.json", JSON.stringify(restUsers), (error) => {
                    error ?
                        res.send({ success: false, message: "Fail to Update Users..." })
                        :
                        isExist ?
                            res.send({ success: true, message: "Users Updated Successfully!" })
                            :
                            res.send({ success: false, message: "No User Found!" });

                })
            }
        })
    }
    catch {
        res.send({ success: false });
    }
};

// to delete a user 
module.exports.deleteAUser = (req, res) => {
    try {
        const { id } = req.body;
        fs.readFile("userData.json", (error, data) => {
            if (error) {
                res.send({ success: false })
            }
            else {
                const users = JSON.parse(data);
                const exist = users.find(user => user.id === Number(id));
                if (exist) {
                    const restUsers = users.filter(user => user.id !== Number(id));
                    fs.writeFile("userData.json", JSON.stringify(restUsers), (error) => {
                        error ?
                            res.send({ success: false })
                            :
                            res.send({ success: true, message: "User Successfully Deleted!" });
                    })
                }
                else {
                    res.send({ success: false, message: "User Id Did not Matched!" });
                }
            }
        })
    }
    catch {
        res.send({ success: false })
    }
}



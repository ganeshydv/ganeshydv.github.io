"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allBanksInstacnces_1 = require("./allBanksInstacnces");
class Bank {
    getAccountHolder(url, method) {
        this.addRouteCommonMethodForAll(url, 'get', method);
    }
    postAccountBalance(url, method) {
        this.addRouteCommonMethodForAll(url, 'post', method);
    }
    addRouteCommonMethodForAll(url, methodtype, handlerMethod) {
        //function like restify,express
        if (this.server_) {
            this.server_[methodtype](url, (req, resp, next) => {
                handlerMethod(req, resp, next);
            });
        }
    }
    InitSystem() {
        this.server_ = new restify();
        this.regiseterAll();
    }
    regiseterAll() {
        allBanksInstacnces_1.AllBanks.forEach((bank) => {
            bank.intitialize(this); // Remove the argument from the method call
        });
    }
}
class restify {
    get(methodtype, method) {
    }
    post(methodtype, method) {
    }
}

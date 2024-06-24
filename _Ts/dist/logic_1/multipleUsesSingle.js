"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOI = exports.SBI = void 0;
class SBI {
    intitialize(x) {
        x.getAccountHolder('abc', this.getData.bind(this));
        x.postAccountBalance('abc', this.getData.bind(this));
    }
    getData(req, res, next) {
    }
    ;
}
exports.SBI = SBI;
class BOI {
    intitialize(x) {
    }
}
exports.BOI = BOI;

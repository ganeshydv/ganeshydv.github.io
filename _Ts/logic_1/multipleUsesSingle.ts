import { Ipayment } from "./singleForAll";

export class SBI {

    public intitialize(x:Ipayment):void{
        x.getAccountHolder('abc',this.getData.bind(this));
        x.postAccountBalance('abc',this.getData.bind(this)  );

    }

    getData(req:any,res:any,next:any){

    };
}

export class BOI {
    public intitialize(x:any):void{
        
    }
}
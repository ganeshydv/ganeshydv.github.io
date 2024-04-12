import { AllBanks } from "./allBanksInstacnces";

type myMethodHandler = (req:string,res:string,next:string)=>void | Promise<void>;

export interface Ipayment{
    getAccountHolder(methodtype:string,method:myMethodHandler):any;
    postAccountBalance(methodtype:string,method:myMethodHandler):any;
}

class Bank implements Ipayment{
    private server_:Server | undefined;
    getAccountHolder(url:string,method:myMethodHandler):any
    {
      this.addRouteCommonMethodForAll(url,'get',method);  
    }
    postAccountBalance(url:string,method:myMethodHandler):any{
        this.addRouteCommonMethodForAll(url,'post',method);  
    }

    
    addRouteCommonMethodForAll(url:string,methodtype:'get'|'post',handlerMethod:myMethodHandler):any{
         //function like restify,express
         if (this.server_) {
            this.server_[methodtype](url,(req:any,resp:any,next:any)=>{
                handlerMethod(req,resp,next);
            });
         }
    }

    public InitSystem(){
        this.server_= new restify( );
        this.regiseterAll();
       
    }

    regiseterAll(){
        AllBanks.forEach((bank)=>{
            bank.intitialize(this); // Remove the argument from the method call
        })
    }
}

interface Server{
    get(methodtype:string,method:myMethodHandler):any;
    post(methodtype:string,method:myMethodHandler):any;
}

class restify implements Server{
    get(methodtype:string,method:myMethodHandler):any{

    }
    post(methodtype:string,method:myMethodHandler):any{

    }
}
//type definition file of passport.js overrides the interface of Request and adds a property user whose type is an empty interface
//override will throw Typescript error of no property id in User in passport.ts file

import { UserDocument } from '../../models/User';

//to override the type of user, set User interface to extend UserDocument interface
declare global {
    namespace Express {
        interface User extends UserDocument {}
    }
}

//then, add typeRoots value in tsconfig.json
import { Injectable } from '@angular/core';
import {TreeNode} from "primeng/components/common/api";
import {Http} from "@angular/http";
import {IsKalemleriList} from "./IsKalemleri";

@Injectable()
export class IsKalemleriService {

    constructor() {}

    getIsKalemleri():Promise<TreeNode[]>{
        return Promise.resolve(IsKalemleriList);
    }

}

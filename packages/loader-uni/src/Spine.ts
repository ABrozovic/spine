import { IAnimationState, IAnimationStateData, ISkeleton, ISkeletonData, SpineBase } from '@pixi-spine/base';
import * as spine34 from '@pixi-spine/runtime-3.4';
import * as spine38 from '@pixi-spine/runtime-3.8';
import * as spine37 from '@pixi-spine/runtime-3.7';
import * as spine41 from '@pixi-spine/runtime-4.1';
import { detectSpineVersion, SPINE_VERSION } from './versions';

/**
 * @public
 */
export class Spine extends SpineBase<ISkeleton, ISkeletonData, IAnimationState, IAnimationStateData> {
    createSkeleton(spineData: ISkeletonData) {
        const ver = detectSpineVersion(spineData.version);
        let spine: any = null;

        if (ver === SPINE_VERSION.VER34) {
            spine = spine34;
        }
        if (ver === SPINE_VERSION.VER37) {
            spine = spine37;
        }
        if (ver === SPINE_VERSION.VER38) {
            spine = spine38;
        }
        if (ver === SPINE_VERSION.VER40 || ver === SPINE_VERSION.VER41) {
            spine = spine41;
        }
        if (!spine) {
            const error = `Cant detect version of spine model ${spineData.version}`;

            console.error(error);
        }
        this.skeleton = new spine.Skeleton(spineData);
        this.skeleton.updateWorldTransform();
        this.stateData = new spine.AnimationStateData(spineData);
        this.state = new spine.AnimationState(this.stateData);
    }
}

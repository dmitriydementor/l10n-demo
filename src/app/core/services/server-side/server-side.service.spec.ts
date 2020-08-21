import { TestBed } from '@angular/core/testing';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { ServerSideService } from './server-side.service';

describe('ServerSideService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [BrowserTransferStateModule]
    }));

    it('should be created', () => {
        const service: ServerSideService = TestBed.get(ServerSideService);
        expect(service).toBeTruthy();
    });
});

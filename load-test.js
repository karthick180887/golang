import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 50 },  // Ramp up to 50 users
        { duration: '1m', target: 500 },  // Ramp up to 500
        { duration: '1m', target: 1000 }, // Ramp up to 1000 (Safety first)
        { duration: '30s', target: 0 },   // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
};

export default function () {
    let res = http.get('http://api-gateway.default.svc.cluster.local:8081/health');
    check(res, {
        'status was 200': (r) => r.status == 200,
    });
    sleep(1);
}

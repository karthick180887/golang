# Load the restart_process extension
load('ext://restart_process', 'docker_build_with_restart')
allow_k8s_contexts('do-blr1-k8s-1-34-1-do-1-blr1-1765796098736')
default_registry('ttl.sh/ride-sharing-dev-2026')

### K8s Config ###

# Uncomment to use secrets
# k8s_yaml('./microservices-go-starter-main/infra/development/k8s/secrets.yaml')

k8s_yaml('./microservices-go-starter-main/infra/development/k8s/app-config.yaml')
k8s_yaml('./microservices-go-starter-main/infra/development/k8s/mongo-deployment.yaml')
k8s_yaml('./microservices-go-starter-main/infra/development/k8s/redis-deployment.yaml')
k8s_yaml('./microservices-go-starter-main/infra/development/k8s/minio-deployment.yaml')
k8s_yaml('./microservices-go-starter-main/infra/development/k8s/rabbitmq-deployment.yaml')

k8s_resource('mongo', port_forwards='27017:27017')
k8s_resource('redis', port_forwards='6379:6379')
k8s_resource('minio', port_forwards=['9000:9000', '9001:9001'])
k8s_resource('rabbitmq', port_forwards=['5672:5672', '15672:15672'])

### End of K8s Config ###

### Microservices List ###
services = [
  'booking-service',
  'driver-service',
  'customer-service',
  'vendor-service',
  'enquiry-service',
  'service-service',
  'vehicle-service',
  'invoice-service',
  'offer-service',
  'promocode-service',
  'notification-service',
  'config-service',
  'worker-service',
]

### Helper function to compile and deploy ###
def deploy_service(name, main_path, port_forwards=None):
    # main_path is relative to microservices-go-starter-main
    rel_main_path = main_path.replace('./microservices-go-starter-main/', './')
    compile_cmd = 'cd microservices-go-starter-main && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o build/' + name + ' ' + rel_main_path
    if os.name == 'nt':
        # Use generic build script for Windows - cd into the directory first
        compile_cmd = 'cd microservices-go-starter-main && .\\infra\\development\\docker\\generic-build.bat ' + name + ' ' + rel_main_path.replace('/', '\\')

    local_resource(
        name + '-compile',
        compile_cmd,
        deps=['./microservices-go-starter-main/services/' + name, './microservices-go-starter-main/shared'],
        labels=["compiles"]
    )

    docker_build_with_restart(
        'ride-sharing/' + name,
        './microservices-go-starter-main',
        entrypoint=['/app/build/' + name],
        dockerfile='./microservices-go-starter-main/infra/development/docker/service.Dockerfile',
        only=[
            './build/' + name,
            './shared',
            './infra/development/firebase-service-account.json',
        ],
        live_update=[
            sync('./microservices-go-starter-main/build', '/app/build'),
            sync('./microservices-go-starter-main/shared', '/app/shared'),
        ],
    )

    k8s_yaml('./microservices-go-starter-main/infra/development/k8s/' + name + '-deployment.yaml')
    k8s_resource(name, resource_deps=[name + '-compile'], labels=["services"], port_forwards=port_forwards)

# Deploy all services
for svc in services:
    deploy_service(svc, './microservices-go-starter-main/services/' + svc + '/cmd/main.go')

### Admin Dashboard ###

docker_build(
  'ride-sharing/admin-dashboard',
  './microservices-go-starter-main/admin-dashboard',
  dockerfile='./microservices-go-starter-main/admin-dashboard/Dockerfile',
  build_args={'NEXT_PUBLIC_API_URL': 'http://localhost:8081'},
)

k8s_yaml('./microservices-go-starter-main/infra/development/k8s/admin-dashboard-deployment.yaml')
k8s_resource('admin-dashboard', port_forwards=3000, labels="frontend")

### End of Admin Dashboard ###

### API Gateway (Special case as main is in root of service dir) ###
deploy_service('api-gateway', './microservices-go-starter-main/services/api-gateway', port_forwards='0.0.0.0:8081:8081')

### End of Microservices ###

### Bharat Oneway Taxi Website ###

docker_build(
  'ride-sharing/bharatonewaytaxi',
  './bharatonewaytaxi',
  dockerfile='./bharatonewaytaxi/Dockerfile',
)

k8s_yaml('./bharatonewaytaxi/k8s-deployment.yaml')
k8s_yaml('./bharatonewaytaxi/ingress.yaml')
k8s_resource('bharatonewaytaxi', port_forwards=3001, labels="frontend")

### End of Bharat Oneway Taxi ###

### Sketch Cabs Website ###

docker_build(
  'ride-sharing/sketchcabs',
  './sketchcabs',
  dockerfile='./sketchcabs/Dockerfile',
  build_args={'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY': 'AIzaSyAYjrbg1hQJYC4vOMvQS7C9lJ3TDWQSuFo'},
)

k8s_yaml('./sketchcabs/k8s-deployment.yaml')
k8s_resource('sketchcabs', port_forwards=3002, labels="frontend")

### End of Sketch Cabs ###

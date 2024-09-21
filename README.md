# ECS Docker Demo

## Local Access

### Check Docker version

```bash
$ docker -v

> Docker version 25.0.3, build 4debf41
```

### Build image and run container

```bash
$ docker build -t ecs-docker-demo .
$ docker run --name ecs-docker-demo -p 8080:80 -dit ecs-docker-demo
```

`-dit` is shorthand for `-d -i -t `

- `-d or --detach`: Run container in background and print container ID
- `-i or --interactive`: Keep STDIN open even if not attached
- `-t or --tty`: Allocate a pseudo-TTY

Now you have a local access to http://localhost:8080

### Execute a command in container

```bash
$ docker exec -it ecs-docker-demo bash
```

### Exit container

```bash
$ exit
```

### Stop container

```bash
$ docker stop ecs-docker-demo
```

### Delete container

```bash
$ docker rm ecs-docker-demo
```

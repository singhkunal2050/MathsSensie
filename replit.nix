{ pkgs }: {
    deps = [
        pkgs.python39Full
        pkgs.python39Packages.bootstrapped-pip
        pkgs.cowsay
    ];
}
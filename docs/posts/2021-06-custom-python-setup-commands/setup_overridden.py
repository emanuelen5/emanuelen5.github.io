from setuptools import setup
from setuptools.command.install import install


def custom_command():
    # Here we can run anything that we like
    print("Running custom command!")


# Inherit from the command class
class InstallWrapper(install):
    # Override the run method
    def run(self):
        custom_command()
        # Run the original install command as well, if you want to extend original behaviour
        super().run()


setup(
    name="package_name",
    version="1.0.0",
    author="emaus",
    # Specify that we want to use our override for the install command
    cmdclass=dict(
        install=InstallWrapper
    )
)

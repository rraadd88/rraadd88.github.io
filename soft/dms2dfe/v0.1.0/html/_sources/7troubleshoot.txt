.. _troubleshoot:

============
Troubleshoot
============

python
------

Following error can occur due to older versions of gcc.

.. code-block:: text

    SystemError: Cannot compile 'Python.h'. Perhaps you need to install python-dev|python-devel.

To fix this please use following command.

.. code-block:: text

    sudo apt-get update    
    sudo apt-get upgrade gcc

matplotlib
----------

Following error may occur if you are using ubuntu > 12.04.

.. code-block:: text

                            * The following required packages can not be built:
                            * freetype
    Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-KhRb8D/matplotlib/

TO fix this, you need to install 'freetype' package by following command.

.. code-block:: text

    sudo apt-get install libfreetype6-dev libxft-dev

pysam
-----

Due to interference issues (with `htslib`) installation of `pysam` can give following error,

.. code-block:: text
    
    .. zlib.h: No such file or directory


Please use following command to install it instead.

.. code-block:: text

    conda install -c bioconda pysam=0.8.4
    pip install dms2dfe

samtools
--------

For similar interference issues (with `htslib`) installation of `samtools` dependency can give following error,

.. code-block:: text
    
    .. zlib.h: No such file or directory


Please use following command before installing samtools. i.e.

.. code-block:: text

    sudo apt-get install zlib1g-dev libncurses5-dev
    sudo apt-get update
    dms2dfe_dependencies/samtools-0.1.18/make

Trimmomatic
-----------

Trimmomatic requires java environment installed in the system. So, if `fast2qcd` or `ana0_fastq2sbam` aborts showing following error,

.. code-block:: text
    
    OSError: [Errno 2] No such file or directory

Please install java environment by following command,

.. code-block:: text
    
    sudo apt-get install openjdk-7-jre-headless
    sudo apt-get update

UCSF-Chimera
------------

To generate images from PDB structures using UCSF-Chimera, essential graphics drivers are required.
In case of an error in `ana4_plotter` please install following drivers.

.. code-block:: text
    
    sudo apt-get install mesa-utils
    sudo apt-get update

xlrd
----

Exceptionally package is not installed through 'pandas'. So following error may occur while fetching supporting data for TEM1 example.

.. code-block:: text

    ImportError: No module named xlrd

To fix this you need to install 'xlrd' package by following command,

.. code-block:: text

    pip install xlrd

Cython
------

cython would be required for dependent packages such as pandas.
It can be installed by following command

.. code-block:: text

    conda install -c anaconda cython 

gcc
---

Python packages such as pandas and matplotlib make use gcc.
To install gcc use following command,

.. code-block:: text

    conda install -c anaconda gcc

pandas
------

Installation of pandas can give following error,

.. code-block:: text

    ValueError: numpy.dtype has the wrong size, try recompiling

To fix it `numpy` need to upgraded, 

.. code-block:: text

    pip install --upgrade numpy

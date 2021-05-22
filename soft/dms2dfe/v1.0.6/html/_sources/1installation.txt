.. _installation:

==========================================
Installation
==========================================

Before install (Recommended)
----------------------------

In order for the installation of `dms2dfe` and its dependencies to run smoothly, make sure that the debian system has fundamental packages required for installations e.g. `gcc` (GNU Compiler Collection) etc. Following command would install them if they are absent on your system: `sudo apt-get install build-essential zlib1g-dev libncurses5-dev libncursesw5-dev gawk;sudo apt-get update`. 

`dms2dfe` requires python 2.7 environment and a linux system (tested on debian).
`Anaconda Python Distribution`_ is recommended for installing required python packages. 
In order to avoid common issues with installation, a conda environment can be created.

.. code-block:: text
    
    wget https://raw.githubusercontent.com/rraadd88/dms2dfe/master/environment.yml
    conda env create -f environment.yml

Activate the python environment by following command,

.. code-block:: text

    source activate dms2dfe

.. _Anaconda Python Distribution: https://conda.io/docs/user-guide/install/download.html

Installation of `dms2dfe`
-------------------------

To install the package written in python 2.7, simply execute following command:

.. code-block:: text

    pip install dms2dfe

Source releases are hosted at https://github.com/kc-lab/dms2dfe/releases.
Optional dependency UCSF-Chimera can be manually installed as described in deps_ section below.

Questions
---------

Please mention them here: https://github.com/kc-lab/dms2dfe/issues .

.. _deps: 

(Optional) Manually installed dependencies 
------------------------------------------

.. code-block:: text

    Visualizations on the PDB structures (step=5)    : UCSF-Chimera (tested on 1.10.1)

Through visuazation modules of `dms2dfe`, position wise fitness scores would be written in the B-factor (temperature factor) of PDB structures. 
Users can use UCSF-Chimera [1]_ to make visualizations automatically (download link `here`_). Please refer to :ref:`Troubleshoot` page for any issues.

This dependency is optional because users can use any PDB viewer of their choice to visualize the .pdb files (located in `project_directory/plots/aas`).

.. _here: https://www.cgl.ucsf.edu/chimera/cgi-bin/secure/chimera-get.py?file=linux_x86_64/chimera-1.10.1-linux_x86_64.bin

(Optional) Manually adding paths to dependencies
------------------------------------------------

Following are the external dependencies that are auto-installed during initialisation of dms2dfe:

Trimmomatic (0.33) [2]_
    Quality control .fastq files

Bowtie2 (2.2.1) [3]_
    Alignining .fastq files

samtools (0.1.18) [4]_
    Convert sam to sorted bam

DSSP (2.0.4) [5]_
    Feature extraction from PDB structure

Clustalo (1.2.2) [6]_
    Feature extraction from MSA

MSMS (2.6.1) [7]_
    Feature extraction: residue depth

Rate4site (3.0.0) [8]_
    Feature extraction: conservation scores


With default configuration, these dependencies would be locally configured and their paths would be appended to `project_directory/cfg/info` file.

In case dependencies are already installed on your system, (custom) paths to the source files can be added manually in the `project_directory/cfg/info` file.


Troubleshoot
------------

Please refer to :ref:`Troubleshoot` page.

Citations
---------

.. [1] Pettersen, E. F., Goddard, T. D., Huang, C. C., Couch, G. S., Greenblatt, D. M., Meng, E. C., & Ferrin, T. E. (2004). UCSF Chimera—a visualization system for exploratory research and analysis. Journal of computational chemistry, 25(13), 1605-1612.

.. [2] Bolger, A. M., Lohse, M., & Usadel, B. (2014). Trimmomatic: a flexible trimmer for Illumina sequence data. Bioinformatics, 30(15), 2114-2120.

.. [3] Langmead, Ben, and Steven L Salzberg. 2012. “Fast gapped-read alignment with Bowtie 2.” Nat Methods 9 (4): 357–59. doi:10.1038/nmeth.1923.


.. [4] Li, H., Handsaker, B., Wysoker, A., Fennell, T., Ruan, J., Homer, N., ... & Durbin, R. (2009). The sequence alignment/map format and SAMtools. Bioinformatics, 25(16), 2078-2079.

.. [5] Kabsch, W., & Sander, C. (1983). Dictionary of protein secondary structure: pattern recognition of hydrogen‐bonded and geometrical features. Biopolymers, 22(12), 2577-2637.

.. [6] Sievers, F., & Higgins, D. G. (2014). Clustal Omega, accurate alignment of very large numbers of sequences. Multiple sequence alignment methods, 105-116.

.. [7] Sanner, M. F., Olson, A. J., & Spehner, J. C. (1996). Reduced surface: an efficient way to compute molecular surfaces. Biopolymers, 38(3), 305-320.

.. [8] Pupko, T., Bell, R. E., Mayrose, I., Glaser, F., & Ben-Tal, N. (2002). Rate4Site: an algorithmic tool for the identification of functional regions in proteins by surface mapping of evolutionary determinants within their homologues. Bioinformatics, 18(suppl_1), S71-S77.

.. _installation:

==========================================
Installation
==========================================

Requirements
------------

Required python packages would be auto installed while installing `dms2dfe`. `Anaconda Python Distribution`_ is recommended for installing dependent python packages.

.. _Anaconda Python Distribution: https://repo.continuum.io/archive/Anaconda2-4.0.0-Linux-x86_64.sh

Especially we recommend installing `pysam` prior installing `dms2dfe`.

.. code-block:: text

    conda install -c bioconda pysam==0.8.4

`dms2dfe` produces .pdb files with B-factor score equaling to Fitness values of corresponding residues.
For making visualizations on PDB structures though `dms2dfe` pipeline, `UCSF-Chimera`_ (tested on 1.10.2) is needed to be installed.
To use `UCSF-Chimera` through python environment, graphics drivers also need to be configured by installing "mesa-utils".

.. _UCSF-Chimera: https://www.cgl.ucsf.edu/chimera/cgi-bin/secure/chimera-get.py?file=linux_x86_64/chimera-1.10.2-linux_x86_64.bin

Installation of `dms2dfe`
-------------------------

`dms2dfe` can be installed by following commands.  

.. code-block:: text

    git clone https://github.com/kc-lab/dms2dfe.git
    cd dms2dfe
    pip install .

Troubleshoot
------------

Please refer to :ref:`Troubleshoot` page.
For information about dependencies (which are auto-installed), please refer to :ref:`dependencies`.

Citations
---------

.. [1] McKinney, W. & Team, P. D. Pandas - Powerful Python Data Analysis Toolkit. Pandas - Powerful Python Data Anal. Toolkit 1625 (2015).

.. [2] Heger, A. Pysam. github.com (2009). at <https://github.com/pysam-developers/pysam>

.. [3] Pedregosa, F. et al. Scikit-learn: Machine Learning in Python. … Mach. Learn. … 12, 2825–2830 (2012).

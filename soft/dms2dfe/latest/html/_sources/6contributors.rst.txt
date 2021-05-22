.. _contributors:

===========================
Guidelines for contributors
===========================


Retrieving and installing the latest version of the code
========================================================

The source code for the package is hosted at `https://github.com/kc-lab/dms2dfe`
The repository can be locally cloned using command: 

.. code-block:: text

    git clone https://github.com/kc-lab/dms2dfe.git


Latest developments can be retrieved by executing this command from the base directory: 

.. code-block:: text

    git pull origin master


Overall testing
===============

Following set of commands would enable overall testing of the package.

.. code-block:: text

    # create conda environment
    wget https://raw.githubusercontent.com/rraadd88/dms2dfe/master/environment.yml
    conda env create -f environment.yml
    source activate dms2dfe

    # install the package
    pip install dms2dfe

    # download the datasets
    git clone https://github.com/rraadd88/ms_datasets.git

    # analyze the datasets
    cd ms_datasets/analysis
    dms2dfe Olson_et_al_2014
    dms2dfe Firnberg_et_al_2014
    # download input sequencing data (~300Mb)
    python get_seq_data.py Melnikov_et_al_2014
    dms2dfe Melnikov_et_al_2014


Submitting a bug report
=======================

Please mention them here: https://github.com/kc-lab/dms2dfe/issues .


How to send suggestions
=======================

Create a branch to save your changes:

.. code-block:: text

    git checkout -b suggested_code origin/master

Send the changes to github repo, first commit the changes:

.. code-block:: text

    git add path/to/file
    git commit -m "succinct decription of suggested changes here"

then push them:

.. code-block:: text

    git push -u origin suggested_code

More information regarding development common workflow used for collaborative developments on github.com: https://guides.github.com/introduction/flow/  
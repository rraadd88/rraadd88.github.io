.. _dependencies:

============
Dependencies
============

Functions of external dependencies and the requirement,

.. code-block:: text

    Feature extraction from PDB structure       : requires DSSP (2.0.4)
    Quality control .fastq files                : requires Trimmomatic (0.33)
    Alignining .fastq files                     : requires Bowtie2 (2.2.1)
    Convert sam to sorted bam                   : requires samtools (0.1.18)

Dependencies would be auto configured by `dms2dfe.configure` module while envoking `dms2dfe.pipeline`. 
In exceptional cases they can configured by following command,

.. code-block:: text
    
    from dms2dfe import configure
    configure.main("path/to/project_directory","deps")

Source files of the tools would be downloaded in `current_directory/dms2dfe_dependencies` folder, paths of which to the source files of all the tools would be appended to the `"project_directory"/cfg/info`.

These paths can be manually appended to default configuration of a `project` by following command,

.. code-block:: text
    
    from dms2dfe import configure
    configure.main("inputs")

Also these paths can be manually, permenently appended to default configuration of `dms2dfe` by following command,

.. code-block:: text
    
    from dms2dfe import configure
    configure.main("defaults")

Troubleshoot
------------

Please refer to :ref:`Troubleshoot` page.
